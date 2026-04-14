export const CATEGORIES = [
  {
    id: "upvc-windows",
    title: "uPVC Windows",
    image: require('../assets/upvc-windows-category-image.jpg'),
    subcategories: [
      {
        id: "casements",
        title: "Casement Windows",
        cardImage: require('../assets/casement-windows-card-image.png'),
        tagline: "Strong, energy efficient, and timeless.",
        heroImage: require('../assets/upvc-windows/casement-windows/main-image.jpg'),
        about: "Casement Windows remain highly favoured among UK homeowners, blending timeless aesthetics with robust frame materials celebrated for their strength, energy efficiency, and minimal upkeep needs.\n\nThe term “casement” denotes a window style where the sash connects to the frame via hinges, enabling outward opening for superior ventilation and effortless cleaning access.\n\nAvailable in a diverse array of customisation options such as frame styles, finishes, colours, and handles, PVCu casement windows cater to a wide range of property types, ensuring their popularity across residential and commercial settings alike.",
        stats: {
          rating: "4.9",
          reviews: "699",
          completed: "1,200+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Frame Styles",
            content: "Your initial choice revolves around selecting the window profile: either bevelled or ovolo. This decision is typically guided by the property's architectural style or personal taste preferences.\n\nBevelled: The bevelled profile, sometimes referred to as chamfered, offers a crisp aesthetic where the frame meets the glass at an angled straight edge.\n\nOvolo: The ovolo, or sculptured profile, is a favoured option for windows in period-style homes, characterised by curved shapes and softer sightlines.",
            images: [
              { image: require('../assets/upvc-windows/casement-windows/styles/bevelled-image.jpg'), label: "Bevelled" },
              { image: require('../assets/upvc-windows/casement-windows/styles/ovolo-image.jpg'), label: "Ovolo" },
            ]
          },
          {
            title: "Security Features",
            content: "A total of 10 security points around each opening window:\n• 2 x steel shoot bolts\n• 4 x central collared cams\n• 2 x high security fire escape / easy clean hinges\n• 2 x 15mm anti-jemmy hinge bolts",
            overviewImage: require('../assets/upvc-windows/casement-windows/security/LOCKING-POINTS-WHOLE.png'),
            images: [
              { image: require('../assets/upvc-windows/casement-windows/security/locking-point-1.png'), label: "Steel Shoot Bolts" },
              { image: require('../assets/upvc-windows/casement-windows/security/locking-point-2.png'), label: "Collared Cams" },
              { image: require('../assets/upvc-windows/casement-windows/security/locking-point-3.png'), label: "Fire Escape Hinges" },
              { image: require('../assets/upvc-windows/casement-windows/security/locking-point-4.png'), label: "Anti-Jemmy Bolts" },
            ]
          },
          {
            title: "Hardware Options",
            content: "Choose from a range of premium handle finishes to complement your window style.",
            images: [
              { image: require('../assets/upvc-windows/hardware/white.png'), label: "White" },
              { image: require('../assets/upvc-windows/hardware/black.png'), label: "Black" },
              { image: require('../assets/upvc-windows/hardware/gold.png'), label: "Gold" },
              { image: require('../assets/upvc-windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
              { image: require('../assets/upvc-windows/hardware/satin-silver.png'), label: "Satin Silver" },
              { image: require('../assets/upvc-windows/hardware/graphite.png'), label: "Graphite" },
              { image: require('../assets/upvc-windows/hardware/bronze.png'), label: "Bronze" },
              { image: require('../assets/upvc-windows/hardware/forged-black.png'), label: "Forged Black" },
            ]
          }
        ],
        colours: [
          {
            title: "Standard Colours",
            content: "Our standard colour range is available with short lead times.",
            swatches: [
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/WHITE.png'), label: "White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/WHITE-GRAIN.png'), label: "White Grain" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/ICE-CREAM-GRAINED.png'), label: "Ice Cream Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/ICE-CREAM-ON-WHITE.png'), label: "Ice Cream on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/CHERRYWOOD.png'), label: "Cherrywood" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/CHERRYWOOD-ON-WHITE.png'), label: "Cherrywood on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/ROSEWOOD-2.png'), label: "Rosewood" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/ROSEWOOD-ON-WHITE.png'), label: "Rosewood on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/IRISH-OAK-2.png'), label: "Irish Oak" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/ANTHRACITE-GREY-ON-WHITE.png'), label: "Anthracite Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/standard/BLACK-GRAINED-ON-WHITE.png'), label: "Black Grained on White" },
            ]
          },
          {
            title: "Extended Lead Time",
            content: "These colours are available with an extended lead time.",
            swatches: [
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/ANTHRACITE-GREY.png'), label: "Anthracite Grey" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/SMOOTH-ANTHRACITE-GREY.png'), label: "Smooth Anthracite Grey" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/SMOOTH-ANTHRACITEE-GREY-ON-WHITE.png'), label: "Smooth Anthracite Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/ANTHRACITE-GREY-ON-WHITE-GRAINED.png'), label: "Anthracite Grey on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/AGATE-GREY-ON-WHITE.png'), label: "Agate Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/AGATE-GREY-ON-WHITE-GRAINED.png'), label: "Agate Grey on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/FRENCH-GREY-ON-WHITE.png'), label: "French Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/FRENCH-GREY-ON-WHITE-GRAINED.png'), label: "French Grey on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/LIGHT-GREY-ON-WHITE.png'), label: "Light Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/SILVER-GREY-ON-WHITE.png'), label: "Silver Grey on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/CHARTWELL-GREEN-ON-WHITE.png'), label: "Chartwell Green on White" },
              { image: require('../assets/upvc-windows/casement-windows/colours/extended/IRISH-OAK-ON-WHITE.png'), label: "Irish Oak on White" },
            ]
          },
          {
            title: "Specials",
            content: "Special order colours for unique projects.",
            swatches: [
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/AGATE-GREY.png'), label: "Agate Grey" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/BLACK-1.png'), label: "Black" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/BLACK-ON-WHITE-GRAINED.png'), label: "Black on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/BALMORAL-GREY-ON-WHITE-GRAINED.png'), label: "Balmoral Grey on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/ICE-CREAM-ON-WHITE-GRAINED.png'), label: "Ice Cream on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/IVORY-ON-WHITE-GRAINED.png'), label: "Ivory on White Grained" },
              { image: require('../assets/upvc-windows/casement-windows/colours/specials/ROSEWOOD-ON-WHITE-GRAINED.png'), label: "Rosewood on White Grained" },
            ]
          }
        ],
        extras: [
          {
            title: "Concealed Trickle Vents",
            content: "This ventilation system is integrated into the head of the outer frame and is concealed by a full-width aluminium exterior canopy, perfectly matched in colour and finish to the window frames.",
            image: require('../assets/upvc-windows/EXTRAS/concealed-vent.jpg')
          },
          {
            title: "Authentic Georgian Bar",
            content: "The Georgian Bar system features a unique astragal clip-on design. These scribed PVCu bars are precisely colour-matched to blend seamlessly with the chosen window finish.",
            image: require('../assets/upvc-windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
          },
          {
            title: "Integral Blinds",
            content: "Integral blinds offer a sleek and practical solution for controlling light and privacy. Sealed between the panes of a double-glazed unit, they stay dust-free and protected from damage."
          }
        ],
        galleryAlbumName: "uPVC Windows",
      },
      {
        id: "flush-casements",
        title: "Flush Casement Windows",
        cardImage: require('../assets/flush-casement-card-image.jpg'),
        tagline: "Elegant flush sash windows.",
        heroImage: "https://images.unsplash.com/photo-1613589083204-6b5eaef0efdd?q=80&w=800&auto=format&fit=crop",
        about: "PVCu Flush Casement Windows offer a modern twist on a classic design. While perfect for traditional properties, they have also gained popularity in contemporary homes.\nUnlike traditional casement windows, where the sash overlaps the frame, flush casement windows have a sash that sits level with the frame when closed, creating a sleek and streamlined look.\nWith a variety of customisation options available, including finishes, colours, and handles, PVCu Flush Casement Windows are an excellent choice for projects seeking a refined and elegant appearance.",
        gallery: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1524816301386-db8b376afab8?q=80&w=400&auto=format&fit=crop"
        ]
      },
      {
        id: "heritage",
        title: "Residence Windows",
        cardImage: require('../assets/resiedence-card-image.jpg'),
        tagline: "Replicate the 19th Century Flush Sash.",
        heroImage: "https://images.unsplash.com/photo-1615529182902-6c8f4fd4ad0e?q=80&w=800&auto=format&fit=crop",
        about: "Replicate the 19th Century Flush Sash Timber Window with Residence 9 Windows. Specifically designed to authentically replicate 19th Century timber designs.\nThe elegantly flush exterior and stylish decorative interior create that classic aesthetic. With industry leading thermal and acoustic performance.",
        gallery: [
          "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=400&auto=format&fit=crop"
        ]
      },
      {
        id: "aluminium",
        title: "Aluminium Windows",
        cardImage: require('../assets/aluminium-windows-card-image.jpg'),
        tagline: "Sleek, strong aluminium frames.",
        heroImage: "https://images.unsplash.com/photo-1510206198642-fbbcbeb1dcba?q=80&w=800&auto=format&fit=crop",
        about: "Aluminium Windows, Doors, and Conservatories from Bradley Scott Windows. Modern aluminium frames offer an incredibly sleek profile and outstanding durability.\nPerfect for adding a contemporary look to any property while ensuring state-of-the-art security and thermal performance.",
        gallery: [
          "https://images.unsplash.com/photo-1600573472540-1925b4fa2f64?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=400&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "composite-doors",
    title: "Composite Doors",
    image: require('../assets/composite-doors-category-image.png'),
    subcategories: []
  },
  {
    id: "roof-lanterns",
    title: "Roof Lanterns",
    image: require('../assets/roof-lanterns-category-image.webp'),
    subcategories: []
  },
  {
    id: "commercial-work",
    title: "Commercial Work",
    image: require('../assets/commercial-category-image.jpg'),
    subcategories: []
  },
  {
    id: "repairs",
    title: "Repairs",
    image: require('../assets/repairs-category-image.png'),
    subcategories: []
  },
  {
    id: "living-spaces",
    title: "Living Spaces",
    image: require('../assets/living-spaces-category-image.jpg'),
    subcategories: []
  },
  {
    id: "bi-fold-doors",
    title: "Bi-Fold Doors",
    image: require('../assets/bi-fold-doors-category-image.png'),
    subcategories: []
  },
  {
    id: "skyrooms",
    title: "Skyrooms",
    image: require('../assets/skyroom-category-image.jpg'),
    subcategories: []
  }
];
