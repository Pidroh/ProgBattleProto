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
            enemiesToSummon: null
        },
        ctors: {
            init: function () {
                this.enemiesToSummon = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            ctor: function (enemiesToSummon) {
                this.$initialize();
                this.enemiesToSummon.AddRange(enemiesToSummon);
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
            timeStamp: null,
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
                this.inputs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Input)).ctor();
                this.playerHand = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)).ctor();
                this.attackDatas = System.Array.init([new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice)], Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove);
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
            BattleConfigure: function (battleConfig) {
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
                        this.ecsInteg.SpawnEnemies();
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
                        this.ecsInteg.SpawnEnemies();
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
                BackgroundInput: 0
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

                var enemyDatas = new Pidroh.ConsoleApp.Turnbased.EnemyDataCreator(entityRenderTexts, mcp).enemyDatas;
                var battleState = this.battleMain.battleState;

                this.battleMain.BasicConfig(battleBasicConfig);
                this.battleMain.BattleConfigure(stage.battleConfig);

                var enemyFactory = new Pidroh.ConsoleApp.Turnbased.EnemyEntityFactory(this.ecs, enemyDatas, this.battleMain);
                this.battleMain.ecsInteg = new Pidroh.ConsoleApp.Turnbased.ECSIntegration(enemyFactory, this.ecs);
                //battleMain.EnemyFactory = enemyFactory;

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
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackgroundInput, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#080808";

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
                var spawned = 0;
                //for (int i = 0; i < spawns.Count; i++)
                while (this.spawns.Count > 0) {
                    var spawn = this.spawns.Comp1(0);
                    Pidroh.ECS.ExtensionMethods.RemoveComponent(this.spawns.Entity(0), spawn);
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
                    enemyAiState.progress = spawned;
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(enemy, enemyAiState);
                    //Console.Write("SPAWN");
                    spawned = (spawned + 1) | 0;
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
                            this.ecs.CreateEntityWithComponent(new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(enemyId, summonPos.$clone()));

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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageData", {
        fields: {
            enemySpawns: null,
            battleConfig: null
        },
        ctors: {
            init: function () {
                this.enemySpawns = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.EnemySpawnData)).ctor();
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
                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 0))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(1, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(1, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 1)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.ctor(new Pidroh.ConsoleApp.Turnbased.BattleConfig(System.Array.init([1], System.Int32)), [new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(3, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))])]);

            }
        },
        methods: {
            Add: function (stageData1) {
                if (stageData1 === void 0) { stageData1 = []; }
                this.stages.AddRange(stageData1);
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
            charByCharAnim: null,
            delayAnim: null,
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
            battlerRenders: null,
            entitiesChars: null,
            MessageDoNotHide: false,
            message: null,
            waitingForMessageInput: false,
            lastPhase: 0,
            messageEnt: null
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
                this.charByCharAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.CharByCharAnimation, new Pidroh.TextRendering.CharByCharAnimation());
                this.delayAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.DelaysAnimation, new Pidroh.TextRendering.DelaysAnimation());
                this.textWorld.Init(70, 25);
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
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), ">");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "^");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "v");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "<");
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
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), ">");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "^");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "v");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "<");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Thunder Bomb");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Summon");
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
                var $t;

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
                        this.ShowMessage("Pick your commands", false, true);
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
                    }}
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
                this.turnBaseTry.Update(delta);
                //clear grid
                this.TextBoard.Reset();

                if (this.lastPhase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.SetAll(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackgroundInput);
                }

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
                            this.battlerRenders.getItem(i1).Origin.DrawChar$1(32, j1, 0, c, bc);
                        }

                    } else {
                        this.battlerRenders.getItem(i1).Origin.Draw(ec, 0, 0, c, bc);
                        this.battlerRenders.getItem(i1).Origin.DrawOneDigit(((gameEntity.graphicRepeatedIndex + 1) | 0), ((0 + ec.length) | 0), 0, c, bc);
                    }


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
                {
                    var X = 24;
                    var Y = 15;
                    this.messageEnt.SetPosition$1(25, 16);
                    if (this.message != null && (!this.CanAdvanceGraphics())) {
                        //TextBoard.DrawGrid(
                        //    messageEnt.Origin.Position.XInt, messageEnt.Origin.Position.YInt, 
                        //    messageEnt.Width, messageEnt.Height, Colors.Board);
                        //messageEnt.Origin.DrawGrid(0, 0, 40, 4, Colors.Board);
                        this.messageEnt.Origin.DrawWithLinebreaks(this.message, 1, 0, 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
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
                        var yOff = (((turnOrderY + 2) | 0) + index) | 0;
                        this.DrawEntityChar(e, color, xOff, yOff);
                        //TextBoard.DrawChar(GetChar(e), xOff, turnOrderY + 2, color);
                        this.TextBoard.DrawTwoDigits(e.life, ((xOff + 3) | 0), yOff, color);
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

                        var y = (turnOrderY + 2) | 0;
                        this.DrawEntityChar(e, color, xOff, y);
                        this.TextBoard.SetCursorAt(xOff, ((turnOrderY + 3) | 0));

                        for (var i2 = 0; i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase); i2 = (i2 + 1) | 0) {
                            var color2 = color;
                            if (drawingId === this.turnBaseTry.battleState.actingEntity && i2 === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.turnBaseTry.battleState.turn) && this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUmFuZG9tU3VwcGxpZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9UaW1lU3RhbXAuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVNYWluLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvQmF0dGxlU2V0dXAuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FQ1NJbnRlZ3JhdGlvbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15QUkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteUZhY3RvcnkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteURhdGFDcmVhdG9yLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGFFeGVjdXRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0hhcHBzL0hhcHAuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9Nb3ZlQ3JlYXRvclByb2cuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TdGFnZURhdGEuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvQWNjZXNzb3IuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvRUNTTWFuYWdlci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FbnRpdHkuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvUHJvY2Vzc29yRmxleC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1BhbGV0dGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL0lUZXh0U2NyZWVuTi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGFwcEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9CYXR0bGVSZW5kZXIuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0dhbWVNYWluLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZXN1bHRTY3JlZW4uY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL1Rlc3RHYW1lLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Nb2RlU2VsZWN0aW9uU2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQmxpbmtBbmltYXRpb24uY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9DaGFyQnlDaGFyQW5pbWF0aW9uLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQXdDWUE7O1lBRUFBLHFDQUFjQSxtQ0FBUUE7WUFDdEJBLHlCQUFTQTtZQUNUQSxLQUFLQSxXQUFXQSxJQUFJQSwrQkFBZUE7O2dCQUcvQkEsMENBQU9BLEdBQVBBLDJC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QUVBQSxPQUFPQTs7d0JBSVBBLE9BQU9BOztvQkFFWEEsSUFBSUE7d0JBRUFBOzt3QkFJQUEsUUFBUUEsQ0FBQ0E7OztnQkFHakJBLElBQUlBLENBQUNBO29CQUVEQSx3QkFBd0JBLGVBQWVBLG9CQUFvQkE7Ozs7Ozs7OztnQ0MvQnZDQSxRQUFtQkEsVUFBeUJBLFVBQWdCQTtnQkFFcEZBLDRIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLFlBQWNBLFdBQVdBO2dCQUN6QkEsaUJBQW1CQSxvQkFBbUJBO2dCQUN0Q0E7Z0JBQ0FBO2dCQUNBQSxLQUFLQSxRQUFRQSxvQkFBb0JBLElBQUlBLGtCQUFrQkE7b0JBRW5EQSxlQUFlQSxLQUFJQTtvQkFDbkJBO29CQUNBQSxTQUFTQTs7O29CQUdUQSxPQUFPQSxZQUFZQTt3QkFFZkE7d0JBQ0FBLHVCQUFZQTs7b0JBRWhCQSxJQUFJQSxxQkFBcUJBLFVBQVVBLFNBQU9BO3dCQUV0Q0E7d0JBQ0FBLCtCQUFnQkE7d0JBQ2hCQTs7b0JBRUpBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLGFBQWFBLFNBQVNBO3dCQUU1QkEsZ0JBQWlCQSxVQUFVQSxTQUFPQTs7Ozs7Ozs7Ozs7O2dDWG9KbEJBLFFBQW1CQSxVQUF1QkEsVUFBZ0JBO2dCQUVsRkEsd0hBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsYUFBbUJBO2dCQUNuQkEsSUFBSUE7b0JBQ0FBLFNBQVNBOztnQkFDYkEsa0JBQWtCQSw2Q0FBNEJBLGlDQUF3QkEsK0JBQXNCQSxXQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuLy91c2luZyBFQ1M7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIEhUTUxQcmVFbGVtZW50IHRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgR2FtZU1haW4gZ3I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIFRleHRCb2FyZDtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIFN0cmluZ0J1aWxkZXIgc2I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nW10gY29sb3JzO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFNldHVwR2FtZShvdXQgR2FtZU1haW4gZ3IsIG91dCBUZXh0Qm9hcmQgVGV4dEJvYXJkKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIFJhbmRvbSBybmQgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgICAgIFJhbmRvbVN1cHBsaWVyLkdlbmVyYXRlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmbG9hdClybmQuTmV4dERvdWJsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnciA9IG5ldyBHYW1lTWFpbigpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGVzdEVudGl0eVN5c3RlbSgpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiR2FtZSBTdGFydFwiKTtcclxuICAgICAgICAgICAgU2V0dXBHYW1lKG91dCBnciwgb3V0IFRleHRCb2FyZCk7XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb2xvcnNbaV0gPSBcIiMxZjIwMjZcIjtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IENvbG9yU3R1ZmYuY29sb3JzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5Cb2FyZF0gPSBcIiM3MDUzNzNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dICAgICAgPSBcIiM3ZWU1ZGFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSAgPSBcIiMyZDRlYjNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM3MzJlNWNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkVuZW15XSA9IFwiI2U1YzE3ZVwiO1xyXG5cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLmlucHV0S2V5XSA9IFwiI2MyY2M1MlwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuV2luZG93TGFiZWxdID0gXCIjNzA1MzczXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvVHVybl0gPSBjb2xvcnNbQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuRW5lbXlUdXJuXSA9IGNvbG9yc1tDb2xvcnMuRW5lbXldO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG5ldyBIVE1MU3R5bGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHN0eWxlLklubmVySFRNTCA9IFwiaHRtbCxib2R5IHtmb250LWZhbWlseTogQ291cmllcjsgYmFja2dyb3VuZC1jb2xvcjojMWYyNTI2OyBoZWlnaHQ6IDEwMCU7IGNvbG9yOiM4ODg7fVwiICsgXCJcXG4gI2NhbnZhcy1jb250YWluZXIge3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRleHQtYWxpZ246Y2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9IFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5IZWFkLkFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICAgICAgYnVmZmVyID0gOTtcclxuICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5IGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5OT05FO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHVuaWNvZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodW5pY29kZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9ORTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5GSVJFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdnJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5Lk5PUk1BTFNIT1Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuSUNFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlRIVU5ERVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3cnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkxFRlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET1dOO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuUklHSFQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuUkVETztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IChpbnQpaWs7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVGVzdEVudGl0eVN5c3RlbSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVXBkYXRlR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBnci5EcmF3KDAuMDMzZik7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJPbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ3IuSW5wdXQgPSAoY2hhcilidWZmZXI7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ3IuSW5wdXQgPSBDaGFyLk1pblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgVGV4dEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFRleHRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcnNbVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXSwgXCJcIiArIFRleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2IuQXBwZW5kKFRleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCIuLi5cIik7XHJcbiAgICAgICAgICAgIC8vdGV4dC5Jbm5lckhUTUwgPSBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDMzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBzdGF0aWMgcHVibGljIGNsYXNzIFJhbmRvbVN1cHBsaWVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGdW5jPGZsb2F0PiBHZW5lcmF0ZXsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgUmFuZ2UoaW50IG1pbiwgaW50IG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkgKEdlbmVyYXRlKCkgKiAobWF4LW1pbikrbWluKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSYW5kb21FbGVtZW50PFQ+KFRbXSBhcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtSYW5nZSgwLCBhcnJheS5MZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGltZVN0YW1wXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEN1cnJlbnRTbmFwO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBUaW1lU3RhbXBTbmFwIEdldFNuYXAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lU3RhbXBTbmFwKEN1cnJlbnRTbmFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZHZhbmNlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFNuYXAgKz0gZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVGltZVN0YW1wU25hcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBUaW1lU25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAoZmxvYXQgc25hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpbWVTbmFwID0gc25hcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuLy91c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgIyByZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBZSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWTsgfSB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdGFudHNcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1ZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0VmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFhWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WVZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgeCwgZmxvYXQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEludGVycG9sYXRlUm91bmRlZChWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgZmxvYXQgcmF0aW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHN0YXJ0UG9zaXRpb24gKiAoMSAtIHJhdGlvKSArIGVuZFBvc2l0aW9uICogcmF0aW8pLlJvdW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZlY3RvcjJEIFJvdW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoKGZsb2F0KU1hdGguUm91bmQoWCksIChmbG9hdClNYXRoLlJvdW5kKFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgQWRkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCIvLyBNSVQgTGljZW5zZSAtIENvcHlyaWdodCAoQykgVGhlIE1vbm8uWG5hIFRlYW1cclxuLy8gVGhpcyBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIGRlZmluZWQgaW5cclxuLy8gZmlsZSAnTElDRU5TRS50eHQnLCB3aGljaCBpcyBwYXJ0IG9mIHRoaXMgc291cmNlIGNvZGUgcGFja2FnZS5cclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuU2VyaWFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yM0QgOiBJRXF1YXRhYmxlPFZlY3RvcjNEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgemVybyA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBvbmUgPSBuZXcgVmVjdG9yM0QoMWYsIDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFggPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFkgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFogPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdXAgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZG93biA9IG5ldyBWZWN0b3IzRCgwZiwgLTFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgcmlnaHQgPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgbGVmdCA9IG5ldyBWZWN0b3IzRCgtMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZm9yd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIC0xZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgYmFja3dhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBaO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDEsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG9uZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDEsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVwOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkb3duOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gcmlnaHQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRm9yd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZvcndhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQmFja3dhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYWNrd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZS5YO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZS5ZO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEFkZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kXHJcbiAgICAgICAgLy8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG4gICAgICAgIC8vLyBhZGRpdGlvbiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICsgdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBDcm9zcyhWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3Jvc3MocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgdmVjdG9yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIENyb3NzKHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICB2YXIgeSA9IC0odmVjdG9yMS5YICogdmVjdG9yMi5aIC0gdmVjdG9yMi5YICogdmVjdG9yMS5aKTtcclxuICAgICAgICAgICAgdmFyIHogPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlkgLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0geDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB5O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyB2YWx1ZTI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IGRpdmlzb3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aXNvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC8gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShvYmogaXMgVmVjdG9yM0QpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG90aGVyID0gKFZlY3RvcjNEKW9iajtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IzRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSh0aGlzLlggKyB0aGlzLlkgKyB0aGlzLlopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSB2ZWN0b3IgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTmVnYXRlKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcmVzIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSB2ZWN0b3IgdGhhdCB0aGUgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gd2lsbCBiZSBzdG9yZWQgaW4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gLXZhbHVlLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB0aGlzLCBvdXQgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5vcm1hbGl6ZShWZWN0b3IzRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHZlY3Rvciwgb3V0IHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvcjtcclxuICAgICAgICAgICAgRGlzdGFuY2UocmVmIHZhbHVlLCByZWYgemVybywgb3V0IGZhY3Rvcik7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDFmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSZWZsZWN0KFZlY3RvcjNEIHZlY3RvciwgVmVjdG9yM0Qgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG4gICAgICAgICAgICBWZWN0b3IzRCByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IzRCB2ZWN0b3IsIHJlZiBWZWN0b3IzRCBub3JtYWwsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcblxyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFN1YnRyYWN0KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgRGVidWdEaXNwbGF5U3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Db25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkuVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWi5Ub1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigzMik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIntYOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBZOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWSk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBaOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIn1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLy8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8vLyBUcmFuc2Zvcm1zIGEgdmVjdG9yIGJ5IGEgcXVhdGVybmlvbiByb3RhdGlvbi5cclxuICAgICAgICAvLy8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJ2ZWNcIj5UaGUgdmVjdG9yIHRvIHRyYW5zZm9ybS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicXVhdFwiPlRoZSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLyAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRyYW5zZm9ybShyZWYgVmVjdG9yMyB2ZWMsIHJlZiBRdWF0ZXJuaW9uIHF1YXQsIG91dCBWZWN0b3IzIHJlc3VsdClcclxuICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgIC8vXHRcdC8vIFRha2VuIGZyb20gdGhlIE9wZW50VEsgaW1wbGVtZW50YXRpb24gb2YgVmVjdG9yM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gU2luY2UgdmVjLlcgPT0gMCwgd2UgY2FuIG9wdGltaXplIHF1YXQgKiB2ZWMgKiBxdWF0Xi0xIGFzIGZvbGxvd3M6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2ZWMgKyAyLjAgKiBjcm9zcyhxdWF0Lnh5eiwgY3Jvc3MocXVhdC54eXosIHZlYykgKyBxdWF0LncgKiB2ZWMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzIHh5eiA9IHF1YXQuWHl6LCB0ZW1wLCB0ZW1wMjtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHZlYywgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdmVjLCBxdWF0LlcsIG91dCB0ZW1wMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdGVtcCwgcmVmIHRlbXAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB0ZW1wLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB0ZW1wLCAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdmVjLCByZWYgdGVtcCwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogPT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gISh2YWx1ZTEgPT0gdmFsdWUyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgbGFiZWw7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUaWNrPiB1bml0cyA9IG5ldyBMaXN0PFRpY2s+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YShzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBGaW5kQnlMYWJlbChMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZURhdGFzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG1vdmVEYXRhc1tpXSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3VtbW9uRW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteVdoaWNoO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdW1tb25FbnRpdHkoaW50IGVuZW15V2hpY2gsIFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlXaGljaCA9IGVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZmVyZW50aWFsUm93Q29sdW1uID0gcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFN1bW1vbkVudGl0eSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1bW1vbkVudGl0eSh2LCB2ZWN0b3IyRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUsIFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgZGlzdGFuY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQWN0aW9uKFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlYWxEYW1hZ2VBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBkYW1hZ2U7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oQXJlYSBhcmVhLCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gVGFyZ2V0LkFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PFR1cm5iYXNlZC5JbnB1dD4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBBdHRhY2tNb3ZlW10gYXR0YWNrRGF0YXMgPSBuZXcgQXR0YWNrTW92ZVtdIHtcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5UaHVuZGVyLCBNb3ZlVHlwZS5UaHVuZGVyKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5GaXJlLCBNb3ZlVHlwZS5GaXJlKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5Ob25lLCBNb3ZlVHlwZS5Ob3JtYWxTaG90KSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5JY2UsIE1vdmVUeXBlLkljZSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlTWF4ID0gMTVmO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQgPSBuZXcgQmF0dGxlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQmF0dGxlQ29uZmlndXJlKEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBuRW5lbWllcztcclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlciBNb3ZlRGF0YUV4ZWN1dGVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBpbnRlcm5hbCBFQ1NJbnRlZ3JhdGlvbiBlY3NJbnRlZztcclxuXHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBFbmVteUdlbmVyYXRlTW92ZXM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcgQmF0dGxlQ29uZmlnIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRXaWR0aCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBCb2FyZEhlaWdodCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVNYWluKGludCBtb2RlLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgICAgICBlY3MuUXVpY2tBY2Nlc3NvcjE8QmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTW92ZVJpZ2h0KTtcclxuICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Nb3ZlRG93bik7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLk1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Ob3JtYWxTaG90LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLlRodW5kZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQmFzaWNDb25maWcoQmF0dGxlQmFzaWNDb25maWcgYmFzaWNDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlLlZhbCA9IGJhc2ljQ29uZmlnLm5UdXJucztcclxuICAgICAgICAgICAgbkVuZW1pZXMgPSBiYXNpY0NvbmZpZy5uRW5lbWllcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuSGVyb0NyZWF0ZWQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lRW50aXR5IHBpY2t1cCA9IG5ldyBHYW1lRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5UeXBlID0gRW50aXR5VHlwZS5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAubGlmZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlRW50aXR5IE5ld0JhdHRsZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYmF0dGxlRW50aXR5ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoYmF0dGxlRW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZUVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlID0gZW50aXRpZXNbaV0ubWF4TGlmZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNPdmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpbmlzaFByZXZpb3VzVGljaygpO1xyXG4gICAgICAgICAgICBib29sIGhlcm9BbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIGVuZW15QWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0FsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWhlcm9BbGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFlbmVteUFsaXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RhbXAuQWR2YW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA+IDAgJiYgYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgLT0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRmluaXNoUHJldmlvdXNUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwcmV2aW91c1BoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuUGlja0hhbmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdyA+PSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBpX2luaXRpYWwgPSBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaV9pbml0aWFsIDwgZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBpX2luaXRpYWw7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUudHVybiA+PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmFuZG9tUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybiA9IGJhdHRsZVN0YXRlLnR1cm4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSYW5kb21Qb3NpdGlvbihCYXR0bGVFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUucG9zLlggPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCA1KTtcclxuICAgICAgICAgICAgZS5wb3MuWSA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlIHBoYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gcHJldmlvdXNQaGFzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSB0aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgPT0gQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUucGhhc2UgPSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFeGVjdXRlUGhhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15R2VuZXJhdGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICBlY3NJbnRlZy5TcGF3bkVuZW1pZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBFeGVjdXRlTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dERvbmUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRFwiKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1vdmVUeXBlIGFyZzEgPSAoTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUVEVEMVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJIYW5kLkNvbnRhaW5zKGFyZzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVDaG9zZW4oYXJnMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IG1pc2MgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuUmVkbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xIHx8IGkgPT0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpIC0gMV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBCYXR0bGVEZWNpZGVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBoZXJvZXMgPSAwO1xyXG4gICAgICAgICAgICBpbnQgZW5lbWllcyA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb2VzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW1pZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaGVyb2VzID09IDAgfHwgZW5lbWllcyA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW92ZUNob3NlbihNb3ZlVHlwZSBtb3ZlVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAoaW50KSBtb3ZlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyB2b2lkIEVuZW15R2VuZXJhdGVNb3ZlcygpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAvLyAgICAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoZS5tb3Zlc1tpXSA9PSBudWxsKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL2UubW92ZXNbaV0uVmFsID0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlLm1vdmVzW2ldLnZhbEFzRW51bSA9IFJhbmRvbVN1cHBsaWVyLlJhbmRvbUVsZW1lbnQoZW5lbXlNb3Zlcyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZXMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcImJsYVwiICsgYmF0dGxlU3RhdGUudHVybi5WYWwpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZCgpO1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYXR0YWNrZXIgPSBlbnRpdGllc1tiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHldO1xyXG4gICAgICAgICAgICBpbnQgdHVybiA9IGJhdHRsZVN0YXRlLnR1cm47XHJcbiAgICAgICAgICAgIEV4ZWN1dGVNb3ZlKGF0dGFja2VyLCB0dXJuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlKEJhdHRsZUVudGl0eSBhY3RvciwgaW50IHR1cm4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb3ZlRGF0YUV4ZWN1dGVyLkV4ZWN1dGVNb3ZlKGFjdG9yLCB0dXJuKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihCYXR0bGVFbnRpdHkgYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYmFzZUQgPSBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucG9zID09IGFjdG9yLnBvcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUQgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZURlZmVuZGVyTXVsdGlwbGllcihCYXR0bGVFbnRpdHkgYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYmFzZUQgPSAxO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucG9zID09IGFjdG9yLnBvcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUQgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmF0dGxlU3RhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgdG90YWxUdXJucztcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIG1vdmVUaWNrX05vdyA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG1vdmVUaWNrX1RvdGFsID0gMDtcclxuICAgICAgICAgICAgcHVibGljIGludCBhY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBwdWJsaWMgQmF0dGxlUGhhc2UgcGhhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmF0dGxlRW50aXR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGxpZmU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBwb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1pblBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWF4UG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnRbXSBtb3ZlcyA9IG5ldyBpbnRbMTBdO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpY1JlcGVhdGVkSW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCBkYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBkcmF3TGlmZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgZHJhd1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIHJhbmRvbVBvc2l0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1YmxpYyBFbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBtYXhMaWZlID0gMztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFbnRpdHlUeXBlIFR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb25WMkQgeyBnZXQgeyByZXR1cm4gbmV3IEJhc2VVdGlscy5WZWN0b3IyRChwb3MuWCwgcG9zLlkpOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIERlYWQgeyBnZXQgeyByZXR1cm4gbGlmZSA8PSAwOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEFsaXZlIHsgZ2V0IHsgcmV0dXJuICF0aGlzLkRlYWQ7IH0gfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIE1vdmVUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb05vdGhpbmcsXHJcbiAgICAgICAgICAgIE1vdmVVcCxcclxuICAgICAgICAgICAgTW92ZUxlZnQsXHJcbiAgICAgICAgICAgIE1vdmVEb3duLFxyXG4gICAgICAgICAgICBNb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgIE5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgIEZpcmUsXHJcbiAgICAgICAgICAgIEljZSxcclxuICAgICAgICAgICAgVGh1bmRlcixcclxuICAgICAgICAgICAgSWNlQm9tYixcclxuICAgICAgICAgICAgVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgIFN1bW1vbkVudGl0eVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBBdHRhY2tNb3ZlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgTW92ZVR5cGUgbW92ZVR5cGU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0YWNrTW92ZShFbGVtZW50IGVsZW1lbnQsIE1vdmVUeXBlIG1vdmVUeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVHlwZSA9IG1vdmVUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBIYXBwVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRhY2tIaXQsXHJcbiAgICAgICAgICAgIEF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIERhbWFnZVRha2VuLFxyXG4gICAgICAgICAgICBNb3ZlbWVudEZhaWxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEJhdHRsZVBoYXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbmVteU1vdmVDaG9pY2UsXHJcbiAgICAgICAgICAgIEhhbmRSZWNoYXJnZSxcclxuICAgICAgICAgICAgUGlja0hhbmRzLFxyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVudGl0eVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlcm8sIGVuZW15LCBwaWNrdXAsIHBhbmVsZWZmZWN0XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRWxlbWVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmlyZSwgSWNlLCBUaHVuZGVyLFxyXG4gICAgICAgICAgICBOb25lXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2FyZFdpZHRoPTY7cHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkSGVpZ2h0PTM7fVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFZhbHVlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFZhbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnVtIHZhbEFzRW51bSB7IHNldCB7IFZhbCA9IENvbnZlcnQuVG9TaW5nbGUodmFsdWUpOyB9IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoaW50IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWwgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWYWx1ZSBvcGVyYXRvciArKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGMxLlZhbCArPSBjMjtcclxuICAgICAgICAgICAgcmV0dXJuIGMxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBvcGVyYXRvciAtKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgLSBjMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWYWx1ZSBjMSwgVmFsdWUgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgPT0gYzIuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAhPSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGZsb2F0KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGludChWYWx1ZSBkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZXN1bHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IEJhdHRsZUJhc2ljQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBuRW5lbWllcztcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG5UdXJucztcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUJhc2ljQ29uZmlnKGludCBuRW5lbWllcywgaW50IG5UdXJucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubkVuZW1pZXMgPSBuRW5lbWllcztcclxuICAgICAgICAgICAgdGhpcy5uVHVybnMgPSBuVHVybnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgSW5wdXRUeXBlIHR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhcmcxO1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQoSW5wdXRUeXBlIHR5cGUsIGludCBhcmcxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5hcmcxID0gYXJnMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgRW51bSBhcmcxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5hcmcxID0gQ29udmVydC5Ub0ludDMyKGFyZzEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBJbnB1dFR5cGVcclxuICAgIHtcclxuICAgICAgICBNb3ZlLCBNaXNjQmF0dGxlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTWlzY0JhdHRsZUlucHV0XHJcbiAgICB7XHJcbiAgICAgICAgRG9uZSwgUmVkb1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlU2V0dXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwdWJsaWMgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVNldHVwKGludCBtb2RlLCBCYXR0bGVCYXNpY0NvbmZpZyBiYXR0bGVCYXNpY0NvbmZpZywgaW50IGRpZmZpY3VsdHksIExpc3Q8U3RhZ2VEYXRhPiBzdGFnZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlY3MgPSBFQ1NNYW5hZ2VyLkNyZWF0ZSgpIDtcclxuICAgICAgICAgICAgdGltZVN0YW1wID0gbmV3IFRpbWVTdGFtcCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gbmV3IEJhdHRsZU1haW4obW9kZSwgZWNzLCB0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICB2YXIgbWNwID0gbmV3IE1vdmVDcmVhdG9yUHJvZygpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlc1tkaWZmaWN1bHR5XTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbWNwLm1vdmVEYXRhcywgZWNzLCB0aW1lU3RhbXApO1xyXG5cclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGVudGl0eVJlbmRlclRleHRzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RGF0YXMgPSBuZXcgRW5lbXlEYXRhQ3JlYXRvcihlbnRpdHlSZW5kZXJUZXh0cyxtY3ApLmVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IGJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkJhc2ljQ29uZmlnKGJhc2ljQ29uZmlnOmJhdHRsZUJhc2ljQ29uZmlnKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXR0bGVDb25maWd1cmUoc3RhZ2UuYmF0dGxlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteUZhY3RvcnkgPSBuZXcgRW5lbXlFbnRpdHlGYWN0b3J5KGVjcywgZW5lbXlEYXRhcywgYmF0dGxlTWFpbik7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uZWNzSW50ZWcgPSBuZXcgRUNTSW50ZWdyYXRpb24oZW5lbXlGYWN0b3J5LCBlY3MpO1xyXG4gICAgICAgICAgICAvL2JhdHRsZU1haW4uRW5lbXlGYWN0b3J5ID0gZW5lbXlGYWN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15QWlzID0gZWNzLlF1aWNrQWNjZXNzb3IyPEVuZW15QUksIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaVN0YXRlbGVzcyA9IGVjcy5DcmVhdGVBY2Nlc3NvcihuZWNlc3Nhcnk6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSSkgfSwgbm90OiBuZXcgVHlwZVtdIHsgdHlwZW9mKEVuZW15QUlTdGF0ZSkgfSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uRW5lbXlHZW5lcmF0ZU1vdmVzID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGVuZW15QWlTdGF0ZWxlc3MuTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGVsZXNzLkdldCgwKS5BZGRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW5lbXlBaXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFpID0gZW5lbXlBaXMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhdHRsZXIgPSBlbmVteUFpcy5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWlTdGF0ZSA9IGVuZW15QWlzLkVudGl0eShpKS5HZXRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlcyA9IGFpLm1vdmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFpUHJvID0gKGorIGFpU3RhdGUucHJvZ3Jlc3MpICUgbW92ZXMuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gbW92ZXNbYWlQcm9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSBpcyBNb3ZlVXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlci5tb3Zlc1tqXSA9IChtb3ZlIGFzIE1vdmVVc2UpLm1vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9iZS5tb3Zlc1tqXSA9IDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWlTdGF0ZS5wcm9ncmVzcyArPSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gZGF0YSB0aGF0IHdpbGwgYmUgYSBwYXJ0IG9mIHN0YWdlZGF0YSBzbyBlYWNoIHN0YWdlIGNhbiBoYXZlIGl0J3MgY29uZmlnXHJcbiAgICAvLy8gSXQgd2lsbCBhbHNvIGJlIGNvbnRhaW5lZCBpbiBiYXR0bGVtYWluLlxyXG4gICAgLy8vIFNob3VsZCBiZSBzdGF0aWMsIG9uY2UgY3JlYXRlZC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8aW50PiBlbmVtaWVzVG9TdW1tb24gPW5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGludFtdIGVuZW1pZXNUb1N1bW1vbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllc1RvU3VtbW9uLkFkZFJhbmdlKGVuZW1pZXNUb1N1bW1vbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29sb3JTdHVmZlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBuZXV0cmFsRGFyayA9IFwiIzE5MDEzYlwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxTdHJvbmcgPSBcIiMyYzNlNDNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgR29vZFN1YjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgRXZpbE1haW47XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnMgPSBuZXcgc3RyaW5nWzIwXTtcclxuXHJcbiAgICAgICAgc3RhdGljIENvbG9yU3R1ZmYoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IFwiIzEzMTMxM1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvXSA9IFwiIzAwOWM4ZFwiO1xyXG4gICAgICAgICAgICAvL2NvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjMDA1ZjkxXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuRW5lbXldID0gXCIjZmYwMzUzXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjOGUwMDYwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjNjg4NjkwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiMwMDU1OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiIzhhZDg5NlwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgaGVyb1N1YiA9IFwiIzRjNmQ1MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IFwiI2ZmNzY5NFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm9dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGVuZW15c3ViID0gXCIjYTc0NjRmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJvYXJkXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiIzc5MzEwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZVNob3RdID0gXCIjZjgyYjM2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZVNob3RdID0gXCIjMDA3ZWZmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJTaG90XSA9IFwiI2EzN2MwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrZ3JvdW5kSW5wdXRdID0gXCIjMDgwODA4XCI7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRUNTSW50ZWdyYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgRW5lbXlFbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeTtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIEVDU0ludGVncmF0aW9uKEVuZW15RW50aXR5RmFjdG9yeSBlbmVteUZhY3RvcnksIEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIZXJvQ3JlYXRlZChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBoZXJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNwYXduRW5lbWllcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteUZhY3RvcnkuU3Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxvYmplY3Q+IG1vdmVzID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteUFJU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBMb29wXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBhY3Rpb25zID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlVXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtb3ZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG1vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteUVudGl0eUZhY3RvcnlcclxuICAgIHtcclxuXHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPEVuZW15U3Bhd25EYXRhPiBzcGF3bnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteUVudGl0eUZhY3RvcnkoRUNTTWFuYWdlciBlY3MsIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzLCBCYXR0bGVNYWluIGJhdHRsZU1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgLy9lY3MuUXVpY2tBY2Nlc3NvcjE8RW5lbXlEYXRhPigpO1xyXG4gICAgICAgICAgICBzcGF3bnMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8RW5lbXlTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlEYXRhcyA9IGVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IGJhdHRsZU1haW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTcGF3bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgc3Bhd25lZCA9IDA7XHJcbiAgICAgICAgICAgIC8vZm9yIChpbnQgaSA9IDA7IGkgPCBzcGF3bnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgd2hpbGUoc3Bhd25zLkNvdW50ID4wKVxyXG4gICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgRW5lbXlTcGF3bkRhdGEgc3Bhd24gPSBzcGF3bnMuQ29tcDEoMCk7XHJcbiAgICAgICAgICAgICAgICBzcGF3bnMuRW50aXR5KDApLlJlbW92ZUNvbXBvbmVudChzcGF3bik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBzcGF3bi5lbmVteUlkO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZW15QUkgPSBlbmVteURhdGFzW2lkXS5lbmVteUFJO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZW15ID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoZW5lbXlBSSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBiZS5saWZlID0gZW5lbXlEYXRhc1tpZF0uaHA7XHJcbiAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gYmUubGlmZTtcclxuICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSBlbmVteURhdGFzW2lkXS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0hPSBiZSAmJiBpdGVtLmdyYXBoaWMgPT0gYmUuZ3JhcGhpYylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWNSZXBlYXRlZEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYmUubWluUG9zID0gbmV3IFZlY3RvcjJEKDMsIDApO1xyXG4gICAgICAgICAgICAgICAgYmUubWF4UG9zID0gbmV3IFZlY3RvcjJEKDUsIDIpO1xyXG4gICAgICAgICAgICAgICAgYmUuVHlwZSA9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteTtcclxuICAgICAgICAgICAgICAgIGVuZW15LkFkZENvbXBvbmVudChiZSk7XHJcbiAgICAgICAgICAgICAgICBFbmVteUFJU3RhdGUgZW5lbXlBaVN0YXRlID0gbmV3IEVuZW15QUlTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlLnByb2dyZXNzID0gc3Bhd25lZDtcclxuICAgICAgICAgICAgICAgIGVuZW15LkFkZENvbXBvbmVudChlbmVteUFpU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiU1BBV05cIik7XHJcbiAgICAgICAgICAgICAgICBzcGF3bmVkKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteVNwYXduRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZW5lbXlJZDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIHBvc2l0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlTcGF3bkRhdGEoaW50IGVuZW15SWQsIFZlY3RvcjJEIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUlkID0gZW5lbXlJZDtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEVuZW15QUkgZW5lbXlBSTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGhwO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgcmVuZGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlEYXRhKEVuZW15QUkgZW5lbXlBSSwgaW50IGhwLCBpbnQgcmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUFJID0gZW5lbXlBSTtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IGhwO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RGF0YUNyZWF0b3JcclxuICAgIHtcclxuICAgICAgICBMaXN0PHN0cmluZz4gcmVuZGVyVGV4dHM7XHJcbiAgICAgICAgcHVibGljIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzID0gbmV3IExpc3Q8RW5lbXlEYXRhPigpO1xyXG4gICAgICAgIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvclByb2c7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGFDcmVhdG9yKExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cywgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yUHJvZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGV4dHMgPSByZW5kZXJUZXh0cztcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ3JlYXRvclByb2cgPSBtb3ZlQ3JlYXRvclByb2c7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6MiwgcmVuZGVyVGV4dDpcIiVcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcpXHJcbiAgICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgTW92ZXMoXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Nb3ZlUmlnaHRcclxuICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgKSwgaHA6IDYsIHJlbmRlclRleHQ6IFwiJlwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBcIlN1bW1vblwiLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5GaXJlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDQ1LCByZW5kZXJUZXh0OiBcIiRcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogNSwgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRW5lbXlBSSBBY3Rpb25zKHBhcmFtcyBvYmplY3RbXSBvYnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWkgPSBuZXcgRW5lbXlBSSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG8gaW4gb2JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKG1vdmVDcmVhdG9yUHJvZy5HZXRNb3ZlSWQobyBhcyBzdHJpbmcpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG8gYXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KWl0ZW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIE1vdmVzKHBhcmFtcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIG1vdmVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEVuZW15KEVuZW15QUkgYWksIGludCBocCwgc3RyaW5nIHJlbmRlclRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcmVuZGVyID0gcmVuZGVyVGV4dHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHJlbmRlclRleHRzLkFkZChyZW5kZXJUZXh0KTtcclxuICAgICAgICAgICAgZW5lbXlEYXRhcy5BZGQobmV3IEVuZW15RGF0YShhaSwgaHAsIHJlbmRlcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlRGF0YUV4ZWN1dGVyXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBwcml2YXRlIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG4gICAgICAgIExpc3Q8VmVjdG9yMkQ+IGF1eCA9IG5ldyBMaXN0PFZlY3RvcjJEPigpO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIoQmF0dGxlTWFpbiB0dXJuQmFzZSwgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IHR1cm5CYXNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSB0aGlzLmJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcbiAgICAgICAgICAgIGVudGl0aWVzID0gdGhpcy5iYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBpbnQgdXNlcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUlkID0gYWN0b3IubW92ZXNbdHVybl07XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSWQgPCAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBtZCA9IG1vdmVEYXRhc1ttb3ZlSWRdO1xyXG4gICAgICAgICAgICBpZiAobWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IG1kLnVuaXRzLkNvdW50O1xyXG4gICAgICAgICAgICBpbnQgbW92ZVRpY2sgPSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3c7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbWQudW5pdHNbbW92ZVRpY2tdLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICBoYXBwTWFuYWdlciA9IGJhdHRsZU1haW4uaGFwcE1hbmFnZXI7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhIGluIGFjdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBNb3ZlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVBY3Rpb24gbWEgPSBhIGFzIE1vdmVBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBtYS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgKz0gcDtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGludmFsaWRNb3ZlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zLlggPCBhY3Rvci5taW5Qb3MuWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA8IGFjdG9yLm1pblBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5ZID4gYWN0b3IubWF4UG9zLllcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlggPiBhY3Rvci5tYXhQb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yICYmIGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5wb3MgPT0gZS5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubGlmZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSkgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSW52YWxpZCBtb3ZlIGdlbmVyYXRlXCIgKyBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBhY3RvcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAobWQsIG5ldyBIYXBwTW92ZURhdGEoYWN0b3JJZCksIG5ldyBIYXBwTW92ZW1lbnRGYWlsKGFjdG9yLnBvcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZU1haW4uaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLk1vdmVtZW50RmFpbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9ySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9yLnBvcy5ZKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyAtPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRkYSA9IGEgYXMgRGVhbERhbWFnZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZGEudGFyZ2V0ID09IFRhcmdldC5BcmVhKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBkZGEuYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbWlycm9yaW5nWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgLy9lbmVtaWVzIGFjdCBvbiBvcHBvc2l0ZSBzaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pcnJvcmluZ1ggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgcG9pbnQgaW4gYXJlYS5wb2ludHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQb3MgPSBwb2ludCAqIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQobWlycm9yaW5nWCwgMSkgKyByZWZlcmVuY2VVc2VyT2ZBcmVhLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJTZWFyY2ggcG9pbnQgXCIrc2VhcmNoUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0ucG9zID09IHNlYXJjaFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgZW50aXRpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maW5kIHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgZGRhLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVhbERhbWFnZShhY3RvciwgZGRhLCB0YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIFN1bW1vbkVudGl0eSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2UgPSBhIGFzIFN1bW1vbkVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlXaGljaCA9IHNlLmVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15SWQgPSBiYXR0bGVNYWluLkJhdHRsZUNvbmZpZy5lbmVtaWVzVG9TdW1tb25bZW5lbXlXaGljaF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gR2V0RW1wdHlTcG90cyhzaWRlOjEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbnMuQ291bnQgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBzdW1tb25Qb3MgPSBzZS5wcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb3NpdGlvbnMuQ29udGFpbnMoc3VtbW9uUG9zKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1vblBvcyA9IHBvc2l0aW9uc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKGVuZW15SWQsIHN1bW1vblBvcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmltID0gYSBhcyBBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFuaW0udGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGFuaW0uYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICBIYXBwQXJlYSBoYXBwQXJlYSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZWEgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBBcmVhID0gbmV3IEhhcHBBcmVhKGFyZWEsIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zLCBtaXJyb3JpbmdYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRhcmdldElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBoYXBwQXJlYSwgbmV3IEhhcHBNb3ZlRGF0YSh1c2VySWQsIHRhcmdldElkLCBhbmltLmVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW0udGFyZ2V0ICE9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShlbnRpdGllcy5JbmRleE9mKHRhcmdldCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHVzZXJJZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoKGludClhbmltLmVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vdmVUaWNrID09IG1kLnVuaXRzLkNvdW50IC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWQudW5pdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdCBpbiBpdGVtLnRoaW5nc1RvSGFwcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdCBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VFbGVtZW50KGFjdG9yLCAoYWN0IGFzIERlYWxEYW1hZ2VBY3Rpb24pLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PFZlY3RvcjJEPiBHZXRFbXB0eVNwb3RzKGludCBzaWRlID0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW50IG9mZlggPSAwO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAxKSBvZmZYID0gMztcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZU1haW4uQm9hcmRIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZChuZXcgVmVjdG9yMkQoaStvZmZYLGopKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUgJiYgYXV4LkNvbnRhaW5zKGUucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguUmVtb3ZlKGUucG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VFbGVtZW50KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5lbGVtZW50ID09IGVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICAgICAgYWN0b3IuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncygoaW50KU1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIG5ldyBIYXBwTW92ZURhdGEoZW50aXRpZXMuSW5kZXhPZihhY3RvciksIC0xLCBlbGVtZW50KSkuQWRkQ29tcG9uZW50KHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoTW92ZURhdGEgbWQsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKG1kLnRhZ3MpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKGludCB0YWcsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKHRhZyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERlYWxEYW1hZ2UoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIERlYWxEYW1hZ2VBY3Rpb24gZGRhLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkVsZW1lbnQgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICBib29sIGVsZW1lbnRhbEJsb2NrID0gYXR0YWNrRWxlbWVudCA9PSB0YXJnZXQuZWxlbWVudCAmJiBhdHRhY2tFbGVtZW50ICE9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBib29sIHN1cGVyRWZmZWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludCBkYW1hZ2UgPSAwO1xyXG4gICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bCA9IGJhdHRsZU1haW4uQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsICo9IGJhdHRsZU1haW4uQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlckVmZmVjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlID0gZGRhLmRhbWFnZSAqIChpbnQpbXVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5saWZlIC09IGRhbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuKSlcclxuICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHRhcmdldElkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRhbWFnZSwgbmV3IEhhcHBEYW1hZ2VEYXRhKHRhcmdldC5lbGVtZW50LCBkZGEuZWxlbWVudCwgZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpLCBkYW1hZ2UsIHN1cGVyRWZmZWN0aXZlLCBlbGVtZW50YWxCbG9jayksIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmxpZmUgPD0gMCAmJiAhc3VwZXJFZmZlY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGVhdGgsIG5ldyBIYXBwTW92ZURhdGEodGFyZ2V0SWQpLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgUmVzb2x2ZVRhcmdldChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXMsIFRhcmdldCB0YXJnZXRUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gVGFyZ2V0LlNlbGYpIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgZmxvYXQgbWluRGlzID0gMTA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlMiBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlMi5EZWFkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlICE9IGUyLlR5cGVcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHNhbWVIZWlnaHQgPSBhY3Rvci5wb3MuWSA9PSBlMi5wb3MuWTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkaXMgPSBhY3Rvci5wb3MuWCAtIGUyLnBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgMCkgZGlzICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgbWluRGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwVGFnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzLkFkZFJhbmdlKHRhZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFncy5BZGQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NIYXBwVGFnc3tcclxuICAgICAgICBDaGFuZ2VFbGVtZW50ID0gNTAwLFxyXG4gICAgICAgIERhbWFnZSA9IDUwMSxcclxuICAgICAgICBEZWF0aCA9IDUwMlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwRGFtYWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgZGFtYWdlRTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFtb3VudDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBlbGVtZW50YWxCbG9jaztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBEYW1hZ2VEYXRhKEJhdHRsZU1haW4uRWxlbWVudCB0YXJnZXRFLCBCYXR0bGVNYWluLkVsZW1lbnQgZGFtYWdlRSwgaW50IHRhcmdldCwgaW50IGFtb3VudCwgYm9vbCBzdXBlckVmZmVjdGl2ZSwgYm9vbCBlbGVtZW50YWxCbG9jaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RSA9IHRhcmdldEU7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlRSA9IGRhbWFnZUU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5zdXBlckVmZmVjdGl2ZSA9IHN1cGVyRWZmZWN0aXZlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRhbEJsb2NrID0gZWxlbWVudGFsQmxvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHVzZXI7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQgPSAtMTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBCYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlRGF0YShpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyLCBpbnQgdGFyZ2V0LCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1vdmVtZW50RmFpbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBtb3ZlVG87XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZW1lbnRGYWlsKFZlY3RvcjJEIG1vdmVUbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVRvID0gbW92ZVRvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEFyZWFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBvZmZzZXQgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1pcnJvcmluZ1g7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKEFyZWEgYXJlYSwgVmVjdG9yMkQgb2Zmc2V0LCBpbnQgbWlycm9yaW5nWClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLm1pcnJvcmluZ1ggPSBtaXJyb3JpbmdYO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmE7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3VycmVudFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgTGlzdDxIYXBwPiBIYXBwcyA9IG5ldyBMaXN0PEhhcHA+KCk7XHJcbiAgICAgICAgTGlzdDxIYXBwSGFuZGxlcj4gaGFuZGxlcnMgPSBuZXcgTGlzdDxIYXBwSGFuZGxlcj4oKTtcclxuICAgICAgICBpbnQgbGF0ZXN0SGFuZGxlZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKEhhcHBIYW5kbGVyIGhoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKGhoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRyeUhhbmRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsYXRlc3RIYW5kbGVkICE9IEN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICAgICAgSGFuZGxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhdGVzdEhhbmRsZWQgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGggaW4gaGFuZGxlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBIYXBwcy5Db3VudCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBjaGVjayBhc3N1bWVzIGhhcHBzIGFyZSBvcmRlcmVkIGJ5IHRpbWUgc3RhbXBcclxuICAgICAgICAgICAgICAgICAgICAvL3doaWNoIHRoZXkgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSGFwcHNbaV0uVGltZVN0YW1wICE9IEN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgbm90IGVxdWFsIHRvIGN1cnJlbnQgdGltZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgaGFzVGFncyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHRhZ3NOZWVkZWQgaW4gaC5uZWNlc3NhcnlUYWdzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFIYXBwc1tpXS5IYXNUYWcodGFnc05lZWRlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1RhZ3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNUYWdzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC5IYW5kbGUoSGFwcHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyB0YWcgaXMgZGlmZmVyZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAgQWRkKEhhcHAgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGguVGltZVN0YW1wID0gQ3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIEhhcHBzLkFkZChoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRUaW1lKys7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgc3RyaW5nIE1haW5UYWc7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZVN0YW1wO1xyXG4gICAgICAgIExpc3Q8QXR0cmlidXRlPiBhdHRycyA9IG5ldyBMaXN0PEF0dHJpYnV0ZT4oKTtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgSGFwcChJQ29udmVydGlibGUgYylcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIoYykpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcChvYmplY3QgbWFpblRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vTWFpblRhZyA9IG1haW5UYWcuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBdHRyaWJ1dGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCBWYWx1ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIEF0dHJpYnV0ZSBTZXRWYWx1ZShmbG9hdCBmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZSA9IGY7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVGFnSG9sZGVyIHRhZ3MgPSBuZXcgVGFnSG9sZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGRBdHRyaWJ1dGUoQXR0cmlidXRlIGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdHRycy5BZGQoYSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IEdldEF0dHJpYnV0ZV9JbnQoaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpYXR0cnNbaW5kZXhdLlZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBIYXNUYWcoaW50IHRhZ3NOZWVkZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFncy5Db250YWlucyh0YWdzTmVlZGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb248SGFwcD4gSGFuZGxlO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsZXIob2JqZWN0IG1haW5UYWcsIEFjdGlvbjxIYXBwPiBoYW5kbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihtYWluVGFnKSk7XHJcbiAgICAgICAgICAgIEhhbmRsZSA9IGhhbmRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRhZ0hvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PG9iamVjdD4gVGFncyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzVGFnKG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRhZ3MuQ29udGFpbnModCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChvYmplY3QgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhZ3MuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8b2JqZWN0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVGFncz1uZXcgTGlzdDxvYmplY3Q+KCk7fVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlQ3JlYXRvclByb2dcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMgPSBuZXcgTGlzdDxNb3ZlRGF0YT4oKTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycyA9IG5ldyBMaXN0PE1vdmVSZW5kZXJEYXRhPigpO1xyXG4gICAgICAgIEFyZWFDcmVhdGlvblV0aWxzIGFyZWFVdGlscyA9IG5ldyBBcmVhQ3JlYXRpb25VdGlscygpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobnVsbCk7IC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBCYXNlVXRpbHMuVmVjdG9yMkRbXSBkaXJlY3Rpb25zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRFtdIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAxKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoLTEsIDApLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDApLCBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUxhYmVscyA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgVXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgRG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIFJpZ2h0XCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIG1vdmVBYnJldiA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIl5cIixcclxuICAgICAgICAgICAgICAgIFwiPFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2XCIsXHJcbiAgICAgICAgICAgICAgICBcIj5cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOZXdNb3ZlRGF0YShsYWJlbDptb3ZlTGFiZWxzW2ldLCBjb25kaXRpb246IG5ldyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZS5DYW5Nb3ZlLCBUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIGFjdGlvbjogbmV3IE1vdmVBY3Rpb24oVGFyZ2V0LlNlbGYsIGRpcmVjdGlvbnNbaV0pLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsICBNb3ZlRGF0YVRhZ3MuSGVyb0luaXRpYWwpKTtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShuYW1lOm1vdmVMYWJlbHNbaV0sIGFicmV2Om1vdmVBYnJldltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJHdW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5Ob25lKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJHdW5cIiwgXCJHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJGaXJlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkZpcmVndW5cIiwgXCJGR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2VndW5cIiwgXCJJR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyZ3VuXCIsIFwiVEdcIik7XHJcblxyXG4gICAgICAgICAgICBBcmVhIGFyZWEgPSBBcmVhVXNlcigpLlJvd0ZvcndhcmQod2lkdGg6IDEsIFhEaXM6IDMpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oYXJlYSwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2Vib21iXCIsIFwiSUJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJib21iXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oYXJlYSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcikpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyYm9tYlwiLCBcIlRCXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJTdW1tb25cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24oU3VtbW9uRW50aXR5LkVuZW15KDAsIG5ldyBWZWN0b3IyRCg1LDApKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TdW1tb24pKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiU3VtbW9uXCIsIFwiU1VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0TW92ZUlkKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vdmVEYXRhLkZpbmRCeUxhYmVsKG1vdmVEYXRhcywgdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVEYXRhKHN0cmluZyBsYWJlbCwgQ29uZGl0aW9uIGNvbmRpdGlvbiwgb2JqZWN0IGFjdGlvbiwgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIFRpY2sgdGljayA9IG5ldyBUaWNrKCk7XHJcbiAgICAgICAgICAgIHRpY2suY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgICB0aWNrLnRoaW5nc1RvSGFwcGVuLkFkZChhY3Rpb24pO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGQodGljayk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0W10gVGFnQXJyYXkocGFyYW1zIG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVSZW5kZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEFicmV2O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVJlbmRlckRhdGEoc3RyaW5nIGxhYmVsLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuQWJyZXYgPSBhYnJldjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YUNyZWF0b3Ige1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFN0YWdlRGF0YT4gc3RhZ2VzID0gbmV3IExpc3Q8U3RhZ2VEYXRhPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhQ3JlYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIG5ldyBFbmVteVNwYXduRGF0YSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFbmVteVNwYXduRGF0YSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIG5ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFbmVteVNwYXduRGF0YSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRW5lbXlTcGF3bkRhdGEoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAxKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRW5lbXlTcGF3bkRhdGEoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZXcgaW50W10geyAxIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFbmVteVNwYXduRGF0YSgzLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgIC8vbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIFN0YWdlRGF0YVtdIHN0YWdlRGF0YTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFnZXMuQWRkUmFuZ2Uoc3RhZ2VEYXRhMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdGFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteVNwYXduRGF0YT4gZW5lbXlTcGF3bnMgPSBuZXcgTGlzdDxFbmVteVNwYXduRGF0YT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZztcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShwYXJhbXMgRW5lbXlTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnLCBwYXJhbXMgRW5lbXlTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db3VudDsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc1Byb2hpYml0ZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNOZWNlc3Nhcnk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxFbnRpdHk+IFNlbGVjdGVkRW50aXRpZXMgPSBuZXcgTGlzdDxFbnRpdHk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvcihwYXJhbXMgVHlwZVtdIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlc05lY2Vzc2FyeSA9IHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEVudGl0eUFkZGVkKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ29udGFpbnMoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEdldChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3Nvck9uZTxUMT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSksIHR5cGVvZihUMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMiBDb21wMihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVDU01hbmFnZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRUNTTWFuYWdlcltdIG1hbmFnZXJzID0gbmV3IEVDU01hbmFnZXJbMjBdO1xyXG4gICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRUNTSWQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlcigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IgQ3JlYXRlUHJvY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yLCBBY3Rpb248QWNjZXNzb3I+IGFjdGlvbilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2Nlc3NvckFjY2Vzc29yKGFjdGlvbiwgYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yIENyZWF0ZUFjY2Vzc29yKFR5cGVbXSBuZWNlc3NhcnksIFR5cGVbXSBub3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWNjID0gbmV3IEFjY2Vzc29yKG5lY2Vzc2FyeSk7XHJcbiAgICAgICAgICAgIGFjYy5UeXBlc1Byb2hpYml0ZWQgPSBub3Q7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjYyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd288VDEsVDI+IFF1aWNrQWNjZXNzb3IyPFQxLCBUMj4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lPFQxPiBRdWlja0FjY2Vzc29yMTxUMT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3Nvck9uZTxUMT4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgZW50aXR5SWRNYXggPSAtMTtcclxuICAgICAgICBMaXN0PEFjY2Vzc29yPiBhY2Nlc3NvcnMgPSBuZXcgTGlzdDxBY2Nlc3Nvcj4oKTtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdGF0aWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIEVDU01hbmFnZXIgR2V0SW5zdGFuY2UoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbZS5lY3NdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBFQ1NNYW5hZ2VyIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtYW5hZ2Vycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbmFnZXJzW2ldID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXSA9IG5ldyBFQ1NNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0uRUNTSWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3QgdilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3Qgdiwgb2JqZWN0IHYyKVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2Mik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkob3V0IEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICBlID0gZW50aXR5O1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4PFQxLFQyPiBRdWlja1Byb2Nlc3NvckZsZXg8VDEsIFQyPihBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvY2Vzc29yRmxleDxUMSwgVDI+IHByb2Nlc3NvckZsZXggPSBuZXcgUHJvY2Vzc29yRmxleDxUMSwgVDI+KHApO1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBwcm9jZXNzb3JGbGV4LmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBY2Nlc3NvciBhY2Nlc3NvcjEgPSBhY2Nlc3Nvci5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NvckZsZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWNjZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3JzLkFkZChhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8PSBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShhY2Nlc3NvcjEsIGkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUFjY2Vzc29yRW50aXR5KEFjY2Vzc29yIGFjY2Vzc29yLCBpbnQgZW50aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eShFQ1NJZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIGJlbG9uZyA9IEhhc0FsbENvbXBzKGFjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5LCBlbnRpdHlJZCkgJiYgSGFzTm9uZU9mVGhlc2VDb21wcyhhY2Nlc3Nvci5UeXBlc1Byb2hpYml0ZWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBtZW1iZXIgPSBhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJlbG9uZyAhPSBtZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiZWxvbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5BZGQoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLlJlbW92ZShlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9pZiAoaXRlbS5FbnRpdHlBZGRlZChlKSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoSGFzQWxsQ29tcG9uZW50cyhlLCBpdGVtLlR5cGVzTmVjZXNzYXJ5KSlcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaXRlbS5TZWxlY3RlZEVudGl0aWVzLkFkZChlKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBBZGRDb21wb25lbnQ8VD4oRW50aXR5IGUpIHdoZXJlIFQgOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVCB0ID0gbmV3IFQoKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gdDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wb25lbnRzKEVudGl0eSBlLCBUeXBlW10gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFzQWxsQ29tcHModHlwZXNOZWNlc3NhcnksIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wcyhUeXBlW10gdHlwZXNOZWNlc3NhcnksIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc05vbmVPZlRoZXNlQ29tcHMoVHlwZVtdIHR5cGVzUHJvaGliaXRlZCwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVzUHJvaGliaXRlZCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNQcm9oaWJpdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEdldENvbXBvbmVudDxUPihFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoVCkgY29tcHNbdHlwZV1bZS5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBFbnRpdHkgOiBJRXF1YXRhYmxlPEVudGl0eT5cclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgZWNzO1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eShpbnQgZWNzLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKEVudGl0eSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5pZCA9PSB0aGlzLmlkICYmIG90aGVyLmVjcyA9PSB0aGlzLmVjcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbk1ldGhvZHNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlbW92ZUNvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuUmVtb3ZlQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEFkZENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKSB3aGVyZSBUOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkdldENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yRmxleDxUMSwgVDI+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwO1xyXG4gICAgICAgIGludGVybmFsIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvcjtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXgoQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxBY2Nlc3Nvcj4gcDtcclxuXHJcbiAgICAgICAgQWNjZXNzb3IgYTtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yKEFjdGlvbjxBY2Nlc3Nvcj4gcCwgQWNjZXNzb3IgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBPcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBBbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldCB7IHJldHVybiBPcmlnaW4uSGVpZ2h0OyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoIHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5XaWR0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhIEFuaW1CYXNlKGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YShsZW5ndGgsIDAsIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFZlY3RvcjJEIEdldFBvc2l0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uU2V0KE9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHgseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gdmVjdG9yMkQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yaWdpbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmlnaW4gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgQW5pbWF0aW9uID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPcmlnaW4uUmVzaXplKHcsIGgpO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uUmVzaXplKHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlbGF5c0FuaW1hdGlvbiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRGVsYXkoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChuZXcgQmFzZURhdGEodiwgMCwgLTEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb3NpdGlvbkFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248UG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFBvc2l0aW9uRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgdGFyZ2V0ID0gZW50aXR5LkFuaW1hdGlvbjtcclxuICAgICAgICAgICAgaWYgKG1haW5EYXRhLnBlcm1hbmVudClcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGVudGl0eS5PcmlnaW47XHJcbiAgICAgICAgICAgIHRhcmdldC5Qb3NpdGlvbiA9IFZlY3RvcjJELkludGVycG9sYXRlUm91bmRlZChtYWluRGF0YS5zdGFydFBvc2l0aW9uLCBtYWluRGF0YS5lbmRQb3NpdGlvbiwgcHJvZ3Jlc3MgLyBsZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgUG9zaXRpb25EYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBwZXJtYW5lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb3NpdGlvbkRhdGEoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGJvb2wgcGVybSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtYW5lbnQgPSBwZXJtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uPFQ+IDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PFQ+IG1haW5EYXRhID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJlZ2lzdGVyTGlzdChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQmFzZURhdGEgYmFzZURhdGEsIFQgbWFpbkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFkZChiYXNlRGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLkFkZChtYWluRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vZGlmeShlbnRpdHksIG1haW5EYXRhW2luZGV4XSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgVCBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuRXhlY3V0ZShtYWluRGF0YVtpbmRleF0sIGJhc2VEYXRhKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKFQgbWFpbkRhdGEsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJhc2VEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgbGVuZ3RoO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJhc2VEYXRhKGZsb2F0IGxlbmd0aCwgZmxvYXQgcHJvZ3Jlc3MsIGludCB0YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gbGVuZ3RoID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gcHJvZ3Jlc3MgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGludD4gdGFyZ2V0cyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChsZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQodGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldICs9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYWxldHRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEh0bWxDb2xvcnM7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZShwYXJhbXMgc3RyaW5nW10gY29sb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSHRtbENvbG9ycyA9IGNvbG9ycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlZmF1bHRQYWxldHRlc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNEtpcm9LYXplID0gbmV3IFBhbGV0dGUoXCIjMzMyYzUwXCIsIFwiIzQ2ODc4ZlwiLCBcIiM5NGUzNDRcIiwgXCIjZTJmM2U0XCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNFJlYWRlciA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiM4YjhjYmFcIiwgXCIjOGJiYTkxXCIsIFwiIzY0OWY4ZFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzROb3ZlbCA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiMzNDJkNDFcIiwgXCIjYjhiOGI4XCIsIFwiIzhiOGNiYVwiKTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2sgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFja05ldXRyYWwgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZU5ldXRyYWwgPSAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZSA9IDM7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEJvYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTk9DSEFOR0VDSEFSID0gKGNoYXIpMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBJTlZJU0lCTEVDSEFSID0gKGNoYXIpMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE5PQ0hBTkdFQ09MT1IgPSAtMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IElOVklTSUJMRUNPTE9SID0gLTE7XHJcbiAgICAgICAgY2hhclssXSBjaGFycztcclxuICAgICAgICBwdWJsaWMgaW50WyxdIFRleHRDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50WyxdIEJhY2tDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1N0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgaW50IGN1cnNvclggPSAwO1xyXG4gICAgICAgIGludCBjdXJzb3JZID0gMDtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1NldE1heFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlcihzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5T2ZmID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBpbnQgeSA9IEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHkgKyB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gKGNoYXIpKGkgKyAnMCcpO1xyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCB4LCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3VHdvRGlnaXRzKGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpLzEwLHgseSxjb2xvcixiYWNrZ3JvdW5kKTtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkgJTEwLCB4KzEsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd19DdXJzb3JfVW5pY29kZUxhYmVsKGludCB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGVuID0gRHJhd1VuaWNvZGVMYWJlbCh2LCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBEcmF3VW5pY29kZUxhYmVsKGludCB1bmljb2RlLCBpbnQgeCwgaW50IHksIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICdhJyAmJiB1bmljb2RlIDw9ICd6Jykge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpdW5pY29kZSwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIGxhYmVsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gMzIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gXCJzcGFjZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERyYXcobGFiZWwsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsLkxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KFRleHRCb2FyZCBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gb3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyc1tpLCBqXSA9IG9yaWdpbi5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJhY2tDb2xvcltpLCBqXSA9IG9yaWdpbi5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbaSwgal0gPSBvcmlnaW4uVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPT0gbnVsbCB8fCB3ID4gY2hhcnMuR2V0TGVuZ3RoKDApIHx8IGggPiBjaGFycy5HZXRMZW5ndGgoMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldE1heFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyIENoYXJBdChpbnQgaSwgaW50IGopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnNbaSwgal07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDdXJzb3JBdChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICAgICAgY3Vyc29yWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIENhbkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRYID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRZID0gY3Vyc29yWTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgdi5MZW5ndGggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIGN1cnJlbnRYID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoIHx8IGN1cnJlbnRZID49IEhlaWdodCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgb2ZmU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2ZmRW5kID0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsodiwgY29sb3IsIG9mZlN0YXJ0LCBvZmZFbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvciwgaW50IG9mZlN0YXJ0LCBpbnQgb2ZmRW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHN0YXJ0ID0gbmV3IFZlY3RvcjJEKEN1cnNvclgsIEN1cnNvclkpO1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gb2ZmU3RhcnQ7IGkgPCBlbmRJbmRleDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb3JpZ2luWCA9IGN1cnNvclg7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IGVuZEluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCBlbmRJbmRleCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgb3JpZ2luWCA+PSBXaWR0aCkgLy9yZWFjaCBlbmQgb2YgdGhlIGxpbmUgd2l0aG91dCBlbmRpbmcgdGhlIHdvcmQsIHNob3VsZCBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7IC8vc2tpcCB0aHJvdWdoIHRoZSBzcGFjZSBpZiBpdCdzIGEgbmV3IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpICsgal0gPT0gJyAnKSAvL25ldyB3b3JkIGJlZ2lucyBzbyBubyBuZWVkIHRvIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcih2W2ldLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVmVjdG9yMkQgZW5kID0gbmV3IFZlY3RvcjJEKEN1cnNvclgsIEN1cnNvclkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERyYXdDdXJzb3JSZXN1bHQoUG9zaXRpb25Ub0luZGV4KHN0YXJ0KSwgUG9zaXRpb25Ub0luZGV4KGVuZCksIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgUG9zaXRpb25Ub0luZGV4KFZlY3RvcjJEIHN0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHN0YXJ0LlggKyBzdGFydC5ZICogV2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0X0N1cnNvcihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdfQ3Vyc29yKChjaGFyKShpICsgJzAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSk7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYywgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodiAhPSBOT0NIQU5HRUNIQVIpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoR3JpZChzdHJpbmcgdGV4dCwgaW50IHgsIGludCB5LCBpbnQgZ3JpZENvbG9yLCBpbnQgdGV4dENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gdGV4dC5MZW5ndGg7XHJcbiAgICAgICAgICAgIERyYXdHcmlkKHgsIHksIHdpZHRoICsgMiwgMywgZ3JpZENvbG9yKTtcclxuICAgICAgICAgICAgRHJhdyh0ZXh0LCB4ICsgMSwgeSArIDEsIHRleHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpO1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geTtcclxuICAgICAgICAgICAgICAgIGlmKHgyID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHgyIC09IFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIsIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aExpbmVicmVha3Moc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IG5ld2xpbmVYLCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGxpbmVicmVha3MgPSAwO1xyXG4gICAgICAgICAgICBpbnQgeE9mZnNldG5ld2xpbmVzID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaSsgeE9mZnNldG5ld2xpbmVzO1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHgyID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHgyIC09IFdpZHRoK25ld2xpbmVYO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIrbGluZWJyZWFrcywgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lYnJlYWtzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeE9mZnNldG5ld2xpbmVzICs9IG5ld2xpbmVYIC0geDItMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoSUVudW1lcmFibGU8Y2hhcj4gdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGNoYXI+KHYpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGNoYXI+KHYsaSksIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJ3wnLCB4LCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCd8JywgeCArIHdpZHRoIC0gMSwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnLScsIHgsIHksIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnLScsIHgsIHkgKyBoZWlnaHQgLSAxLCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCYWNrQ29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4MiwgaW50IHkyLCBvYmplY3QgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB2MSwgaW50IHYyLCBpbnQgdjMsIGludCB2NCwgb2JqZWN0IGJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IERyYXdDdXJzb3JSZXN1bHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGludCBFbmRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBFbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0KGludCBzdGFydEluZGV4LCBpbnQgZW5kSW5kZXgsIFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTdGFydEluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgICAgICAgICAgICAgIEVuZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBTdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIEVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuTiA6IElUZXh0U2NyZWVuLCBJTW91c2VJbnB1dCwgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIFRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoZmxvYXQgZikgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTigpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKFRleHRXb3JsZCB0ZXh0V29ybGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSB0ZXh0V29ybGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZC5Jbml0KHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgbW91c2VEb3duLCBpbnQgdjEsIGludCB2MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIGludCBJbnB1dEFzTnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0VW5pY29kZSAtIDQ4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBUZXh0Qm9hcmQgR2V0Qm9hcmQoKTtcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElNb3VzZUlucHV0XHJcbiAgICB7XHJcbiAgICAgICAgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIGV2ZW50VHlwZSwgaW50IHYxLCBpbnQgdjIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTW91c2VFdmVudHNcclxuICAgIHsgXHJcbiAgICAgICAgTW91c2VEb3duLFxyXG4gICAgICAgIE5vbmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbkhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBJVGV4dFNjcmVlbiBTY3JlZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJTW91c2VJbnB1dCBNb3VzZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElLZXlib2FyZElucHV0IEtleSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKG9iamVjdCBkbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JlZW4gPSBkbnMgYXMgSVRleHRTY3JlZW47XHJcbiAgICAgICAgICAgIE1vdXNlID0gZG5zIGFzIElNb3VzZUlucHV0O1xyXG4gICAgICAgICAgICBLZXkgPSBkbnMgYXMgSUtleWJvYXJkSW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsaW5nXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQWN0aW9uIEhhbmRsZTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3NvclR3bzxIYXBwVGFncywgVGltZVN0YW1wU25hcD4gaGFwcHM7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBoaWdoZXN0SGFuZGxlZDtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyhCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyLCBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlUmVuZGVyID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICB2YXIgd29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICB2YXIgcG9zQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gYmF0dGxlU2V0dXAuZWNzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gYmF0dGxlU2V0dXAudGltZVN0YW1wO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIuSGFwcEhhbmRsaW5nID0gdGhpcztcclxuICAgICAgICAgICAgaGFwcHMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+KCk7XHJcbiAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGFtYWdlID0gZS5HZXRDb21wb25lbnQ8SGFwcERhbWFnZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW1hZ2UuZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgYWJzb3JicyBcIiArIGRhbWFnZS50YXJnZXRFK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KStcIiBpcyB1bmFmZWN0dGVkLlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5zdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIHJhdmFnZXMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkrXCIgdGFrZXMgYSBoZWF2eSBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTIsIC0yKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDMsIDMsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKSwgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGdldHMgaHVydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLlNob3dNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eShkZWZlbmRlci5XaWR0aCwgZGVmZW5kZXIuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmICghZGFtYWdlLnN1cGVyRWZmZWN0aXZlICYmICFkYW1hZ2UuZWxlbWVudGFsQmxvY2sgJiYgYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5BbGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja0NvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja0NvbG9yID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeENvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhciBkYW1hZ2VDaGFyID0gJ1gnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAwLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMiwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAwLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDIsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBkZWZlbmRlci5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKC0xLCAtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJ1onLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EYW1hZ2UpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuU2hvd0JhdHRsZU1lc3NhZ2UoYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoaG1kLnVzZXIpICsgXCIgaXMgZW1pdHRpbmcgXCIgKyBobWQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC50YXJnZXRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbaG1kLnVzZXJdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywzKTtcclxuICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcysgbmV3IFZlY3RvcjJEKC0xLC0xKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLDEsMSwgMSwxLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EZWF0aCkpO1xyXG4gICAgICAgICAgICBBY3Rpb248RW50aXR5PiBtb3ZlTWlzcyA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITNcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZiA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlbWVudEZhaWw+KCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaG1kLnVzZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZXIgPSBiYXR0bGVNYWluLmVudGl0aWVzW2VJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG1vdmVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBobWYubW92ZVRvO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc0YgPSAocG9zICsgcG9zMikgLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIk1vdmUgZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3NGKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKG1vdmVNaXNzLCBNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYSA9IGUuR2V0Q29tcG9uZW50PEhhcHBBcmVhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHVzZXJSZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlckVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGhhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gYXJlYS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZUVmZmVjdCA9IHdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICB1c2VFZmZlY3QuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIucG9zKSk7XHJcbiAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQodXNlRWZmZWN0LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHBvaW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3MgPSBpdGVtICogbmV3IFZlY3RvcjJEKGhhLm1pcnJvcmluZ1gsIDEpICsgaGEub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWCA+IDUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5ZID4gMikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLlhJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShmaW5hbFBvcy5ZSW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZmluYWxQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MuWEludCwgcG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBuZXdIaWdoZXN0SGFuZGxlZCA9IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBoYXBwcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJBRFZcIitiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmF0dGxlUmVuZGVyLkNhbkFkdmFuY2VHcmFwaGljcygpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFncyA9IGhhcHBzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3SGlnaGVzdEhhbmRsZWQgPSBoYXBwcy5Db21wMihpKS5UaW1lU25hcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlnaGVzdEhhbmRsZWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhhbiBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbi5DYW5IYW5kbGUodGFncy50YWdzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwICsgXCIgLSBcIiArIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW4uSGFuZGxlcihoYXBwcy5FbnRpdHkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXArXCIgLSBcIisgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSBuZXdIaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBBY3Rpb248RW50aXR5PiBIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKEFjdGlvbjxFbnRpdHk+IGhhbmRsZXIsIHBhcmFtcyBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiB0YWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMih0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIENhbkhhbmRsZShMaXN0PGludD4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhZ3MuQ29udGFpbnMoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWdoZXN0SGFuZGxlZCA+PSBoYXBwcy5MZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZW5kZXIgOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gdHVybkJhc2VUcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBQb3NpdGlvbkFuaW1hdGlvbiBwb3NBbmltO1xyXG4gICAgICAgIHByaXZhdGUgQ2hhckJ5Q2hhckFuaW1hdGlvbiBjaGFyQnlDaGFyQW5pbTtcclxuICAgICAgICBwcml2YXRlIERlbGF5c0FuaW1hdGlvbiBkZWxheUFuaW07XHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBpbnQgaW5wdXQ7XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGlucHV0OyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHZhbHVlOyAvL0NvbnNvbGUuV3JpdGVMaW5lKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyBIYXBwSGFuZGxpbmcgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBMaXN0PERlbGF5ZWRBY3Rpb25zPiB0YXNrcyA9IG5ldyBMaXN0PERlbGF5ZWRBY3Rpb25zPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVDaGFycztcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4gbWlzY0Rlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPigpLChfbzEpPT57X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuRG9uZSxcIkRvbmVcIik7X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuUmVkbyxcIlJlZG9cIik7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8SW5wdXQsIHN0cmluZz4gbW92ZUJ1dHRvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBJbnB1dEtleT4gbW92ZUtleXM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkZWJ1Z09uID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkU2NhbGU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHg7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUZXh0RW50aXR5PiBiYXR0bGVyUmVuZGVycztcclxuXHJcbiAgICAgICAgY2hhcltdW10gZW50aXRpZXNDaGFycztcclxuICAgICAgICBwcml2YXRlIGJvb2wgTWVzc2FnZURvTm90SGlkZTtcclxuICAgICAgICBzdHJpbmcgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZSBsYXN0UGhhc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IG1lc3NhZ2VFbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZW5kZXIoQmF0dGxlTWFpbiBiYXR0bGVMb2dpYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmdbXSBlbnRpdHlUZXh0cyA9IHsgXCJAXCIsIFwiJlwiLCBcIiVcIiwgXCIkXCIsIFwiWDJcIiwgXCJYM1wiIH07XHJcbiAgICAgICAgICAgIGVudGl0aWVzQ2hhcnMgPSBuZXcgY2hhcltlbnRpdHlUZXh0cy5MZW5ndGhdW107XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXR5VGV4dHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzQ2hhcnNbaV0gPSBlbnRpdHlUZXh0c1tpXS5Ub0NoYXJBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeSA9IGJhdHRsZUxvZ2ljO1xyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkNoYXJCeUNoYXJBbmltYXRpb24+KG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBkZWxheUFuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuRGVsYXlzQW5pbWF0aW9uPihuZXcgRGVsYXlzQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZCA9IG5ldyBUZXh0Qm9hcmQoNzAsIDI1KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uKG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVyUmVuZGVycyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlRW50ID0gdGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoNDAsIDQpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tIaXQsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMSldO1xyXG4gICAgICAgICAgICAgICAgaW50IGRlZmVuZGVyRUlEID0gaC5HZXRBdHRyaWJ1dGVfSW50KDApO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGRlZmVuZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlbmRlckVJRCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVuZGVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbZGVmZW5kZXJFSURdO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQpaC5HZXRBdHRyaWJ1dGVfSW50KDIpO1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBmZSA9IEdldFByb2pUZXh0RW50aXR5KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWZlbmRlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGRlZmVuZGVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGF0dGFja2VyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihkZWZlbmRlci5Qb3NpdGlvblYyRCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvczIgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvczIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL3R1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKEJhdHRsZU1haW4uSGFwcFRhZy5EYW1hZ2VUYWtlbiwgKGgpID0+XHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgZmUgPSB0ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgLy8gICAgZmUuT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICAvLyAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKTtcclxuICAgICAgICAgICAgLy8gICAgYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5DaGFyKCcgJywgMC4xZikpO1xyXG4gICAgICAgICAgICAvLyAgICAvL1Nob3dNZXNzYWdlKFwiR290IGRhbWFnZWRcIik7XHJcbiAgICAgICAgICAgIC8vfSkpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja01pc3MsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDApXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgxKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IDY7XHJcbiAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbW92ZUNoYXJzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMik9PntfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSxcIklcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR1wiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFwiPlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFwiXlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXCJ2XCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcIjxcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU1VcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcIiBcIik7cmV0dXJuIF9vMjt9KTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28zKT0+e19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJY2UgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZpcmUgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRodW5kZXIgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIkljZSBCb21iXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR3VuXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXCI+XCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsXCJeXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcInZcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFwiPFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUaHVuZGVyIEJvbWJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlN1bW1vblwiKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICAgICAgbW92ZUJ1dHRvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxJbnB1dCwgc3RyaW5nPigpLChfbzQpPT57X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCksXCJnXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpLFwiZlwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UpLFwiaVwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iKSxcImJcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIpLFwieVwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKSxcInRcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0KSxcImRcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwKSxcIndcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24pLFwic1wiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCksXCJhXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksXCJTcGFjZVwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLFwiclwiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICAgICAgbW92ZUtleXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxJbnB1dCwgSW5wdXRLZXk+KCksKF9vNSk9PntfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKSxJbnB1dEtleS5USFVOREVSKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UpLElucHV0S2V5LklDRSk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSksSW5wdXRLZXkuRklSRSk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCksSW5wdXRLZXkuTk9STUFMU0hPVCk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0KSxJbnB1dEtleS5SSUdIVCk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwKSxJbnB1dEtleS5VUCk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24pLElucHV0S2V5LkRPV04pO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0KSxJbnB1dEtleS5MRUZUKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLElucHV0S2V5LkRPTkUpO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksSW5wdXRLZXkuUkVETyk7cmV0dXJuIF9vNTt9KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkTGluZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlKGJhdHRsZXJSZW5kZXJzLkNvdW50IDwgdGhpcy50dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMuQWRkKHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDIsIDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIEdldEVudGl0eU5hbWUoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW3VzZXJdO1xyXG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZyhjaGFycykgKyAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IEdldFByb2pUZXh0RW50aXR5KFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICBpbnQgZWxlbWVudENvbG9yID0gRWxlbWVudFRvUHJvakNvbG9yKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uU2V0QmFja0NvbG9yKGVsZW1lbnRDb2xvciwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgSW5wdXRLZXkgaW5wdXQgPSAoSW5wdXRLZXkpSW5wdXQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FICYmIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUpIENvbnNvbGUuV3JpdGVMaW5lKGlucHV0KTtcclxuICAgICAgICAgICAgLy9pbnQgaW5wdXROdW1iZXIgPSBpbnB1dCAtICcwJztcclxuICAgICAgICAgICAgLy9pZiAoZGVidWdPbiAmJiBpbnB1dCA9PSAnaycpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBEZWJ1Z0V4dHJhLkRlYnVnRXguU2hvdygpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgIT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2hvd01lc3NhZ2UoXCJQaWNrIHlvdXIgY29tbWFuZHNcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5GaXJlQXVyYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiWF9fWFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBIaWRlTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdFBoYXNlID0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZUtleXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsdWUgPT0gaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZV9Mb2dpYygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcbiAgICAgICAgICAgIERyYXdHcmFwaGljcyhkZWx0YSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2FuQWR2YW5jZUdyYXBoaWNzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQuSXNEb25lKCkgJiYgIXdhaXRpbmdGb3JNZXNzYWdlSW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgQ2FuQWR2YW5jZV9Mb2dpYygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2FuQWR2YW5jZUdyYXBoaWNzKCkgJiYgSGFwcEhhbmRsaW5nLklzRG9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd01lc3NhZ2Uoc3RyaW5nIHMsIGJvb2wgd2FpdEZvcklucHV0ID0gdHJ1ZSwgYm9vbCBkb05vdEhpZGUgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZURvTm90SGlkZSA9IGRvTm90SGlkZTtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IHM7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHRpbWVUb1dyaXRlID0gbWVzc2FnZS5MZW5ndGggKiAwLjAxNWY7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9Xcml0ZSA+IDAuNGYpIHRpbWVUb1dyaXRlID0gMC40ZjtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKG1lc3NhZ2VFbnQuQW5pbUJhc2UodGltZVRvV3JpdGUpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YSgwLCBtZXNzYWdlLkxlbmd0aCArIDEpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KHRpbWVUb1dyaXRlICsgMC44Zik7XHJcblxyXG4gICAgICAgICAgICAvL3dhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSB3YWl0Rm9ySW5wdXQ7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSGlkZU1lc3NhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiTTogXCIrcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QmF0dGxlTWVzc2FnZShzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdHVybkJhc2VUcnkuQmF0dGxlRGVjaWRlZCgpKVxyXG4gICAgICAgICAgICAgICAgU2hvd01lc3NhZ2Uocyk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyYXBoaWNzKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrZ3JvdW5kSW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBncmlkU2NhbGUgPSA0O1xyXG4gICAgICAgICAgICBncmlkT2Zmc2V0eCA9IDI7XHJcbiAgICAgICAgICAgIGdyaWRPZmZzZXR5ID0gMTtcclxuICAgICAgICAgICAgaW50IGVuZW15R3JpZE9mZlggPSBncmlkU2NhbGUgKiAzO1xyXG4gICAgICAgICAgICBib29sIGRyYXdEb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAzICogZ3JpZFNjYWxlOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgMyAqIGdyaWRTY2FsZTsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3RG90KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGkgKyBlbmVteUdyaWRPZmZYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJSBncmlkU2NhbGUgPT0gMCAmJiBqICUgZ3JpZFNjYWxlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCArIGVuZW15R3JpZE9mZlgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlICsgMSwgZ3JpZFNjYWxlICsgMSwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlICsgMSwgZ3JpZFNjYWxlICsgMSwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnYW1lRW50aXR5LlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgQmFzZVV0aWxzLlZlY3RvcjJEIHNjcmVlblBvcyA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oKEJhc2VVdGlscy5WZWN0b3IyRClwb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5ZID0gc2NyZWVuUG9zLlkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5YID0gc2NyZWVuUG9zLlggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9iYXR0bGVyRW50aXRpZXNbaV0ub3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiAhPSBzY3JlZW5Qb3MgJiYgdGV4dFdvcmxkLklzRG9uZSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGJhdHRsZXJSZW5kZXJzW2ldLkFuaW1CYXNlKDAuMTVmKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24sIHNjcmVlblBvcywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIGMgPSBDb2xvcnMuRW5lbXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKSBjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuRGVhZClcclxuICAgICAgICAgICAgICAgICAgICBjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG4gICAgICAgICAgICAgICAgaW50IGJjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IGdhbWVFbnRpdHkuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBiYyA9IEVsZW1lbnRUb0F1cmFDb2xvcihlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgZWMuTGVuZ3RoICsgMTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdDaGFyKCcgJywgaiwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXcoZWMsIDAsIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd09uZURpZ2l0KGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCAwICsgZWMuTGVuZ3RoLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCB0ZXh0Qm9hcmRIZWlnaHQgPSAzICogZ3JpZFNjYWxlO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgaW50IHggPSA2ICogZ3JpZFNjYWxlICsgMjY7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDb250cm9scyh5LCB4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkudGltZVRvQ2hvb3NlID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlIC8gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCwgeSArIDE2LCAoaW50KShyYXRpbyAqIDE1KSwgMSwgQ29sb3JzLkJvYXJkLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCAtIDEsIHkgLSAxLCAxNSwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJYID0gNiAqIGdyaWRTY2FsZSArIDEwO1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBEcmF3TGlmZSgzLCAxNik7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludCBYID0gMjQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnQgWSA9IDE1O1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUVudC5TZXRQb3NpdGlvbihYICsgMSwgWSArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCAmJiAoIUNhbkFkdmFuY2VHcmFwaGljcygpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5YSW50LCBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5ZSW50LCBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50LldpZHRoLCBtZXNzYWdlRW50LkhlaWdodCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2VFbnQuT3JpZ2luLkRyYXdHcmlkKDAsIDAsIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLkRyYXdXaXRoTGluZWJyZWFrcyhtZXNzYWdlLCAxLCAwLCAxLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTWVzc2FnZURvTm90SGlkZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5TZXRBbGwoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsWCwgWSwgNDAsIDQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICAvL3RleHRCb2FyZC5EcmF3X0N1cnNvcih0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZS5Ub1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIYXBwSGFuZGxpbmcuSGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZUdyYXBoaWNzKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuVHJ5SGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAoQ2FuQWR2YW5jZSgpKVxyXG4gICAgICAgICAgICAvL3tcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvQXVyYUNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFbGVtZW50VG9Qcm9qQ29sb3IoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGJjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkZpcmVTaG90O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5JY2VBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuVGh1bmRlckF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKEJhc2VVdGlscy5WZWN0b3IyRCBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHBvcy5YO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHBvcy5ZO1xyXG4gICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRCh4ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR4LCAyICogZ3JpZFNjYWxlIC0geSAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY3JlZW5Qb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0NvbnRyb2xzKGludCB5LCBpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZCh4IC0gMiwgeSAtIDEsIDIwLCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHgsIHkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb250cm9sc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIDE7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIGk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHNbaV07XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgYnV0dG9uTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChtb3ZlQnV0dG9ucy5UcnlHZXRWYWx1ZShpbnB1dCwgb3V0IGJ1dHRvbk5hbWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk5hbWUgPSBcIlVOXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gYnV0dG9uTmFtZS5MZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKCdbJywgeDIgLSAxLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcignXScsIHgyICsgbGVuZ3RoQm5hbWUsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUgbW92ZSA9IHR1cm5CYXNlVHJ5LnBsYXllckhhbmRbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoYnV0dG9uTmFtZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIGRlc2NyaXB0aW9uID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMuVHJ5R2V0VmFsdWUobSwgb3V0IGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgYXJnMSA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG1pc2NEZXNjcmlwdGlvbnNbYXJnMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgbGVuZ3RoQm5hbWUsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgICAgIC8vRHJhd01vdmUobW92ZSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXcoYywgeDIgKyAzLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdXaXRoR3JpZChjK1wiXCIsIHgyLCB5ICsgMiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdMaWZlKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZCh0dXJuT3JkZXJYIC0gMSwgdHVybk9yZGVyWSAtIDEsIDIwLCA5LCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDEsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJMaWZlXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgOCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkVsZW1lbnRcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gLTE7IC8vdXNpbmcgdGhpcyBiZWNhdXNlIG5vdCBhbGwgdW5pdHMgZ2V0IGRyYXduXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kcmF3TGlmZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gQ29sb3JzLkhlcm9UdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeU9mZiA9IHR1cm5PcmRlclkgKyAyICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHlPZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKEdldENoYXIoZSksIHhPZmYsIHR1cm5PcmRlclkgKyAyLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdUd29EaWdpdHMoKGludCllLmxpZmUsIHhPZmYgKyAzLCB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGVsZW1lbnQgPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkZpcmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiSWNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJUaHVuZGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZUNvbG9yID0gRWxlbWVudFRvQXVyYUNvbG9yKGUuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGVsZW1lbnQsIHhPZmYgKyA3LCB5T2ZmLCBlQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd1R1cm5PcmRlcihpbnQgdHVybk9yZGVyWCwgaW50IHR1cm5PcmRlclkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWx1ZSB0dXJuc1BlclBoYXNlID0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKHR1cm5PcmRlclggLSAxLCB0dXJuT3JkZXJZIC0gMSwgMTQsIDYgKyB0dXJuc1BlclBoYXNlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIlR1cm4gT3JkZXJcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIGludCBkcmF3aW5nSWQgPSAtMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kcmF3VHVybilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdpbmdJZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxICsgZHJhd2luZ0lkICogMztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSB0dXJuT3JkZXJZICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHhPZmYsIHR1cm5PcmRlclkgKyAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IHR1cm5zUGVyUGhhc2U7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IyID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmF3aW5nSWQgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICYmIGkyID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm4gJiYgdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IyID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMiA8IHR1cm5zUGVyUGhhc2UgJiYgZS5tb3Zlc1tpMl0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGMgPSBHZXRDaGFyT2ZNb3ZlKGUsIGkyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcjIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogeE9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0VudGl0eUNoYXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcltdIGNoYXJzID0gR2V0Q2hhcihlKTtcclxuXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGNoYXJzLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIC8vaWYgKGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd09uZURpZ2l0KGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCB4ICsgY2hhcnMuTGVuZ3RoLCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEdldENoYXJPZk1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGkyKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSBlLm1vdmVzW2kyXTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVDaGFyc1soQmF0dGxlTWFpbi5Nb3ZlVHlwZSl2YWxdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIgXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhcltdIEdldENoYXIoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc0NoYXJzW2dhbWVFbnRpdHkuZ3JhcGhpY107XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKFZhbHVlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLlZhbCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoQmF0dGxlTWFpbi5Nb3ZlVHlwZSltb3ZlLlZhbDtcclxuICAgICAgICAgICAgICAgIERyYXdNb3ZlKG0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKEJhdHRsZU1haW4uTW92ZVR5cGUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIENvbG9yc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkSGVybyA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEVuZW15ID0gMjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvID0gMztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteSA9IDQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVyb1R1cm4gPSA1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15VHVybiA9IDY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgaW5wdXRLZXkgPSA3O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJvYXJkID0gODtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBXaW5kb3dMYWJlbCA9IDk7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZUF1cmEgPSAxMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VBdXJhID0gMTE7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlckF1cmEgPSAxMjtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlU2hvdCA9IDEzO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZVNob3QgPSAxNDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyU2hvdCA9IDE1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJhY2tncm91bmRJbnB1dCA9IDE2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gSW5wdXRLZXlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5PTkUsIExFRlQsIFJJR0hULCBET1dOLCBVUCwgRklSRSwgUkVETywgRE9ORSxcclxuICAgICAgICAgICAgSUNFLFxyXG4gICAgICAgICAgICBUSFVOREVSLFxyXG4gICAgICAgICAgICBOT1JNQUxTSE9UXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVNYWluIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIHByaXZhdGUgTW9kZVNlbGVjdGlvblNjcmVlbiBtb2RlU2VsZWN0aW9uU2NyZWVuO1xyXG4gICAgICAgIElUZXh0U2NyZWVuXyBtYWluRHJhdztcclxuICAgICAgICBwcml2YXRlIFJlc3VsdFNjcmVlbiByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgLy9JVGV4dFNjcmVlbltdIHNjcmVlbnMgPSBuZXcgSVRleHRTY3JlZW5bNV07XHJcbiAgICAgICAgaW50IGRpZmZpY3VsdHk7XHJcbiAgICAgICAgaW50W10gZW5lbXlBbW91bnQgPSBuZXcgaW50W10gICB7IDEsIDEsIDIsIDEsIDIsIDMsIDIsIDMsIDEsIDIsIDMsIDMgfTtcclxuICAgICAgICBpbnRbXSB0dXJuQW1vdW50ID0gbmV3IGludFtdIHsgMiwgNCwgMiwgNiwgNCwgMiwgNiwgNCwgOCwgOCwgNiwgOCB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGUgPSAxO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgU3RhZ2VEYXRhQ3JlYXRvciBzZGMgPSBuZXcgU3RhZ2VEYXRhQ3JlYXRvcigpO1xyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gc2RjLnN0YWdlcztcclxuXHJcbiAgICAgICAgICAgIGludCBkID0gZGlmZmljdWx0eTtcclxuICAgICAgICAgICAgaWYgKHN0YWdlcy5Db3VudCA8PSBkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLlJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5ID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2QgPSAyMDA7XHJcbiAgICAgICAgICAgIGlmIChkID49IGVuZW15QW1vdW50Lkxlbmd0aCkgZCA9IGVuZW15QW1vdW50Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGludCBuRW5lbWllcyA9IGVuZW15QW1vdW50W2RdO1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXAgPSBuZXcgQmF0dGxlU2V0dXAobW9kZSwgbmV3IEJhdHRsZUJhc2ljQ29uZmlnKG5UdXJuczogNSwgbkVuZW1pZXM6IG5FbmVtaWVzKSwgZGlmZmljdWx0eSwgc3RhZ2VzKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciBlY3MgPSBiYXR0bGVTZXR1cC5lY3M7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSkpO1xyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcbiAgICAgICAgICAgIGlmICh0aW1lQXR0YWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSAoNWYgKiB0dXJuQW1vdW50W2RdKSAqIG5FbmVtaWVzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi50aW1lVG9DaG9vc2VNYXggPSB0aW1lVG9DaG9vc2U7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uSW5pdCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZU1haW4pO1xyXG4gICAgICAgICAgICBuZXcgSGFwcEhhbmRsaW5nKGJhdHRsZVJlbmRlciwgYmF0dGxlU2V0dXApO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IGJhdHRsZVJlbmRlcjtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuID0gbmV3IFJlc3VsdFNjcmVlbigpO1xyXG4gICAgICAgICAgICByZXN1bHRTY3JlZW4uYmF0dGxlUmVzdWx0ID0gYmF0dGxlTWFpbi5iYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5EcmF3LkRyYXcoZik7XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzVmljdG9yeSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTY3JlZW4uRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gcmVzdWx0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0U2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBtb2RlU2VsZWN0aW9uU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5EcmF3LkdldEJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXN1bHRTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlc3RHYW1lIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFNjcmVlbk4gc2NyZWVuID0gbmV3IFRlc3RTY3JlZW4oKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNldEFsbChzY3JlZW4pO1xyXG4gICAgICAgICAgICBzY3JlZW4uSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgc2NyZWVuLkdldEJvYXJkKCkuRHJhdyhcIlRlc3RcIiwgMCwwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdFNjcmVlbiA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZVNlbGVjdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgc3RyaW5nIHlvdUxvc2UgPSBcIllvdSBsb3NlXCI7XHJcbiAgICAgICAgaW50IHNlbGVjdGlvbjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgTW9kZVNlbGVjdGlvblNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuICAgICAgICBwdWJsaWMgaW50IG1vZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgc2NyZWVuU3RhZ2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5KSBJbnB1dDtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJQcm9nQmF0dGxlIFByb3RvdHlwZSB2MC4zXCIsIDEsIDEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiQSBnYW1lIGJ5IFBpZHJvaFwiLCAxLCAyLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV046XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFZhbmlsbGFcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlthXSBFbGVtZW50YWxcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBWYW5pbGxhIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA2LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbZF0gRWxlbWVudGFsIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA3LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV04pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgZmlyZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJTYW1lIGVsZW1lbnQgPSBubyBkYW1hZ2VcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDApO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJJdCBpcyBiZXN0IHRvIGhhdmUgaGFkIHNvbWUgZXhwZXJpZW5jZSB3aXRoIHZhbmlsbGEgbW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBTdGFydCBFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIEdvIGJhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9zdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgLy9pZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJsaW5rRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNoYXIgdGV4dDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBiYWNrQ29sb3IsIHRleHRDb2xvcjtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rSW5hY3RpdmU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50IGxpbmVCcmVha3MgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2Zmc2V0ZWRQZXJtID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaSArIG9mZnNldGVkUGVybTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eS5PcmlnaW4uQ2hhckF0KG9mZnNldGVkLCBsaW5lICsgbGluZUJyZWFrcykgPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkUGVybSAtPSBvZmZzZXRlZDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+ICgobGVuZ3RoVGV4dCAqIHJhdGlvKSArIG1haW5EYXRhLmNoYXJTdGFydCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGIuRHJhd0NoYXIoJyAnLCBvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
