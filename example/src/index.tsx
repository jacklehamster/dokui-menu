// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { KeyboardControl } from "dokui-menu";
import { openMenu } from "dokui-menu"

const sampleSrc = "https://cdn.britannica.com/59/182359-050-C6F38CA3/Scarlett-Johansson-Natasha-Romanoff-Avengers-Age-of.jpg";
const pikaSrc = "https://media.tenor.com/rbx3ph5SLRUAAAAi/pikachu-pokemon.gif";
const byeSrc = "https://images.vexels.com/media/users/3/272491/isolated/preview/d6d58dbb207e59b46ab9e797b32ae014-bye-word-glossy-sign.png";
const landscapeSrc = "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg";

export function showMenu() {
  const { popupControl } = openMenu({
    editor: true,
    layouts: [
      {
        name: "hello",
        position: [350,100],
        size: [200, 200],
        positionFromRight: true,
      },
    ],
    dialog: {
      messages: [
        {
          text: "hello",
          pictures: [{
            layout: "hello",
            images: [{
              src: landscapeSrc,
              size: "cover",
            }, { src: pikaSrc }],
          }],    
        },
        "there!",
        {
          text: "bye",
          pictures: [{
            layout: "hello",
            images: [{ src:  byeSrc }],
          }],
        },
      ],
    },
    menu: {
      layout: {
        name: "main",
      },
      items: [
        "first",
        {
          icon: pikaSrc,
          label: "second",
          onHover: {
            pictures: [{
              layout: {
                position: [350,100],
                size: [200, 200],
                positionFromRight: true,
              },
              images: [{ src: pikaSrc }],
              dialog: {
                layout: {
                  position: [350,315],
                  size: [200, 50],
                  positionFromRight: true,
                },
                messages: ["Pika!"],
              },  
            }],
          },
        },
        {
          emoji: "3️⃣",
          label: "third",
          submenu: {
            pictures: [{
              layout: {
                position: [350,350],
                size: [300, 300],
                positionFromBottom: true,
                positionFromRight: true,
              },
              images: [
                {
                  src: sampleSrc,
                },
              ],
            }],
        
            layout: {
              position: [150, 100],
              size: [200, 150],
            },
            items: [
              "3.1",
              "3.2",
              "3.3",
              "3.4",
              "------",
              {
                label: "exit",
                back: true,
              },
            ],
          },
        },
        {
          label: "fourth",
          submenu: {
            layout: {
              name: "main",
              position: [150, 100],
              size: [200, 200],
            },
            items: [
              "a",
              "b",
              "c",
              {
                label: "exit",
                back: true,
              },
            ],
          },
        },
        {
          label: "dialog",
          dialog: {
            pictures: [{
              layout: {
                position: [350,350],
                size: [300, 300],
                positionFromBottom: true,
                positionFromRight: true,
              },
              images: [{ src: sampleSrc }],
            }],      
            layout: {
              name: "main",
              position: [150, 100],
              size: [400, 180],
            },
            messages: [
              "Hello",
              {
                text: "How are you?",
                menu: {
                  layout: {
                    position: [150, 300],
                    size: [300, 200],
                  },
                  items: [
                    { label: "I don't know",
                      dialog: {
                        layout: {
                          position: [250, 200],
                          size: [300, 100],      
                        },
                        messages: ["you should know"],
                      } 
                    },
                    { label: "good", back: true,
                      dialog: {
                        layout: {
                          position: [250, 200],
                          size: [300, 100],      
                        },
                        messages: ["That's good to know."],
                      } 
                    },
                    { label: "bad", back: true },
                  ],
                },
              },
              "Bye",
            ],
          },
        },
        {
          label: "dialog without closing menu",
          dialog: {
            layout: {
              position: [150, 100],
              size: [200, 200],
            },
            messages: [
              "test dialog",
            ],
          },
        },
        {
          label: "hidden on select",
          hideOnSelect: true,
          dialog: {
            layout: {
              position: [150, 100],
              size: [300, 200],
            },
            messages: [
              "parent popup hidden",
            ],
          },
        },
        {
          label: "prompt",
          prompt: {
            layout: {
              position: [150, 100],
              size: [600, 300],
            },
            label: "What is your name?",
            defaultText: "Name",
            randomText: [
              "Alis",
              "Bryan",
              "Carlos",
              "David",
              "Emily",
            ],
            languages: ["english", "korean"],
          },
        },
        {
          label: "simpler prompt",
          prompt: {
          },
        },
        {
          label: "show triangle without submenu",
          showTriangle: true,
        },
        {
          label: "subdialog",
          dialog: {
            layout: {
              position: [200, 200],
              size: [300, 200],
            },
            messages: [
              "text1",
              {
                text: "main dialog",
                subdialog: {
                  layout: {
                    position: [150, 300],
                    size: [600, 300],
                  },
                  messages: [
                    "subdialog"
                  ],
                }
              },
              "text2",
              {
                text: "main dialog 2",
                subdialog: {
                  layout: {
                    position: [150, 100],
                    size: [600, 300],
                  },
                  messages: [
                    "subdialog"
                  ],
                }
              },
            ]
          }
        },
        {
          label: "long dialog",
          dialog: {
            messages: [
              "eiifcbevudbghnfvjcfrt nekicvecjbuevhucvvjgrehe iifcbevudbgbecj itejinviru nftuvej bijevdcfhlk",
            ],
          },
        },
        {
          hideOnSelect: true,
          label: "dialog with some messages hidden",
          dialog: {
            messages: [
              "next will be hidden",
              {
              },
              "next will be hidden, with a menu",
              {
                menu: {
                  items: [
                    "item1",
                    "item2",
                    {
                      label: "back",
                      back: true,
                    },
                  ],
                },
              },
              "back to dialog",
            ],
          },
        },
        {
          label: "dialog with async callback",
          dialog: {
            messages: [
              {
                text: "wait 3 sec",
                action() {
                    return new Promise(resolve => {
                      setTimeout(resolve, 3000);
                    });
                },
              },
              {
                text: "wait 3 sec again",
                action() {
                    return new Promise(resolve => {
                      setTimeout(resolve, 3000);
                    });
                },
              }
            ],
          },
        },
        {
          label: "dialog with auto next",
          dialog: {
            messages: [
              {
                autoNext: 3000,
                text: "autoNext in 3 sec",
              },
              {
                text: "autoNext in 3 sec. async first",
                autoNext: 3000,
                action() {
                    return new Promise(resolve => {
                      setTimeout(resolve, 2000);
                    });
                },
              },
              {
                text: "autoNext in 3 sec. async afterwards",
                autoNext: 3000,
                action() {
                    return new Promise(resolve => {
                      setTimeout(resolve, 4000);
                    });
                },
              },
              {
                text: "DONE",
              }
            ],
          },
        }, 
        {
          label: "test menu hiding",
          dialog: {
            layout: {
              name: "main-dialog",
              position: [undefined, 200],
              positionFromBottom: true,
            },
            messages: [
              { text: "Hello there." },
              {
                text: "How are you?",
                menu: {
                  layout: {
                    position: [400, 360],
                    size: [undefined, 150],
                    positionFromRight: true,
                    positionFromBottom: true,
                  },
                  items: [
                    {
                      label: "I don't know",
                      dialog: {
                        layout: {
                          position: [100, 100],
                          size: [300, 200],
                        },
                        messages: [
                          { text: "You should know!" },
                        ],
                      },
                    },
                    {
                      back: true,
                      label: "good",
                      dialog: {
                        layout: {
                          name: "main-dialog",
                          position: [0, 0],
                          size: [300, 300],
                        },
                        messages: [
                          { text: "That's nice to know!" },
                        ],
                      },
                    },
                    {
                      back: true,
                      label: "bad",
                    },
                  ],
                },
              },
              { text: "Bye bye." },
              {
                  async action() {
                      console.log("DONE...");
                  },
                  autoNext: 0,
              },
            ],
          }
        },
        {
          label: "exit",
          back: true,
          dialog: {
            layout: {
              position: [200, 100],
              size: [300, 200],
            },
            messages: [
              "Going down...",
              {
                autoNext: 0,
              },
              {
                action: async () => console.log("Changing scene."),
                autoNext: 0,
              },
            ],
          }
        }   
      ],
    },
  });
  return { keyboard: new KeyboardControl(popupControl) };
}
