//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";


import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.


export function ParticlesContainer(props: unknown) {
    // this customizes the component tsParticles installation
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        }).catch((error) => {
            console.error(error);
        });
    }, []);





    const options = {
        "fullScreen": {
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 0
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": [
                    "circle",
                    "square",
                    "triangle",
                    "polygon",
                    "emoji"
                ],
                "options": {
                    "polygon": [
                        {
                            "sides": 5
                        },
                        {
                            "sides": 6
                        }
                    ],
                    "emoji": {
                        "particles": {
                            "size": {
                                "value": 8
                            }
                        },
                        "value": [
                            "💩",
                            "🤡",
                            "🍀",
                            "🍙",
                            "🦄",
                            "⭐️"
                        ]
                    }
                }
            },
            "opacity": {
                "value": {
                    "min": 0,
                    "max": 1
                },
                "animation": {
                    "enable": true,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                }
            },
            "links": {
                "enable": false
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 5
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        },
        "emitters": {
            "life": {
                "count": 0,
                "duration": 0.1,
                "delay": 0.4
            },
            "rate": {
                "delay": 0.1,
                "quantity": 150
            },
            "size": {
                "width": 0,
                "height": 0
            }
        }
    };

    const options2 = {

        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        "particles": {
            destroy: {
                bounds: {
                    top: 30
                },
                mode: "split",
                split: {
                    count: 1,
                    factor: {
                        value: 0.333333
                    },
                    rate: {
                        value: 100
                    },
                    particles: {
                        stroke: {
                            width: 0
                        },
                        color: {
                            value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
                        },
                        number: {
                            value: 0
                        },
                        collisions: {
                            enable: false
                        },
                        destroy: {
                            bounds: {
                                top: 0
                            }
                        },
                        opacity: {
                            value: {
                                min: 0.1,
                                max: 1
                            },
                            animation: {
                                enable: true,
                                speed: 0.7,
                                sync: false,
                                startValue: "max",
                                destroy: "min"
                            }
                        },
                        effect: {
                            type: "trail",
                            options: {
                                trail: {
                                    length: {
                                        min: 5,
                                        max: 10
                                    }
                                }
                            }
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: 2,
                            animation: {
                                enable: false
                            }
                        },
                        life: {
                            count: 1,
                            duration: {
                                value: {
                                    min: 1,
                                    max: 2
                                }
                            }
                        },
                        move: {
                            enable: true,
                            gravity: {
                                enable: true,
                                acceleration: 9.81,
                                inverse: false
                            },
                            decay: 0.1,
                            speed: {
                                min: 10,
                                max: 25
                            },
                            direction: "outside",
                            outModes: "destroy"
                        }
                    }
                }
            },
            "number": {
                "value": 200
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": [
                    "circle",
                    "square",
                    "triangle",
                    "polygon",
                    "emoji"
                ],
                "options": {
                    "polygon": [
                        {
                            "sides": 5
                        },
                        {
                            "sides": 6
                        }
                    ],
                    "emoji": {
                        "particles": {
                            "size": {
                                "value": 8
                            }
                        },
                        "value": [
                            "🎊",
                            "🎉",
                            "⭐️"
                        ]
                    }
                }
            },
            "opacity": {
                "value": {
                    "min": 0,
                    "max": 1
                },
                "animation": {
                    "enable": true,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                }
            },
            "links": {
                "enable": false
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 5
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        },
        emitters: {
            direction: "top",
            life: {
                count: 0,
                duration: 0.1,
                delay: 0.1
            },
            rate: {
                delay: 0.15,
                quantity: 1
            },
            size: {
                width: 100,
                height: 0
            },
            position: {

                y: 100,
                x: 50
            }
        },
        detectRetina: true,
    };

    const emitterRate = {
        delay: 0.1,
        quantity: 2
    }

    return (<>
        {init &&
            <Particles id="tsparticles"
                options={{

                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    "particles": {
                        "color": {
                            "value": [
                                "#1E00FF",
                                "#FF0061",
                                "#E1FF00",
                                "#00FF9E"
                            ]
                        },
                        "move": {
                            "decay": 0.05,
                            "direction": "top",
                            "enable": true,
                            "gravity": {
                                "enable": true,
                                acceleration: 12,
                                maxSpeed: 250,
                            },
                            "outModes": {
                                "top": "none",
                                "default": "destroy"
                            },
                            "speed": {
                                "min": 10,
                                "max": 50
                            }
                        },
                        "number": {
                            "value": 450
                        },
                        "opacity": {
                            "value": 1
                        },
                        "rotate": {
                            "value": {
                                "min": 0,
                                "max": 360
                            },
                            "direction": "random",
                            "animation": {
                                "enable": true,
                                "speed": 30
                            }
                        },
                        "tilt": {
                            "direction": "random",
                            "enable": true,
                            "value": {
                                "min": 0,
                                "max": 360
                            },
                            "animation": {
                                "enable": true,
                                "speed": 30
                            }
                        },
                        "size": {
                            "value": {
                                "min": 1,
                                "max": 2
                            },
                            "animation": {
                                "enable": true,
                                "startValue": "min",
                                "count": 1,
                                "speed": 16,
                                "sync": true
                            }
                        },
                        "roll": {
                            "darken": {
                                "enable": true,
                                "value": 25
                            },
                            "enable": true,
                            "speed": {
                                "min": 5,
                                "max": 15
                            }
                        },
                        "wobble": {
                            "distance": 30,
                            "enable": true,
                            "speed": {
                                "min": -7,
                                "max": 7
                            }
                        },
                        "shape": {
                            "type": [
                                "circle",
                                "square",
                                "triangle",
                                "polygon"
                            ],
                            "options": {
                                "polygon": [
                                    {
                                        "sides": 5
                                    },
                                    {
                                        "sides": 6
                                    }
                                ]
                            }
                        }
                    },
                    "emitters": [
                        {
                            "position": {
                                "x": 0,
                                "y": 30
                            },
                            "rate": {
                                "quantity": 10,
                                "delay": 0.15
                            },
                            "particles": {
                                "move": {
                                    "direction": "top-right",
                                    "outModes": {
                                        "top": "none",
                                        "left": "none",
                                        "default": "destroy"
                                    }
                                }
                            }
                        },
                        {
                            "position": {
                                "x": 300,
                                "y": 30
                            },
                            "rate": {
                                "quantity": 10,
                                "delay": 0.15
                            },
                            "particles": {
                                "move": {
                                    "direction": "top-right",
                                    "outModes": {
                                        "top": "none",
                                        "left": "none",
                                        "default": "destroy"
                                    }
                                }
                            }
                        },
                        {
                            "position": {
                                "x": 100,
                                "y": 30
                            },
                            "rate": {
                                "quantity": 10,
                                "delay": 0.15
                            },
                            "particles": {
                                "move": {
                                    "direction": "top-left",
                                    "outModes": {
                                        "top": "none",
                                        "right": "none",
                                        "default": "destroy"
                                    }
                                }
                            }
                        }
                    ],
                    detectRetina: true,
                }} />}
    </>);
}