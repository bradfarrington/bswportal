export const CATEGORIES = [
  {
    id: "windows",
    title: "Windows",
    image: require('../assets/windows-category-image.jpg'),
    subcategories: [
      {
        id: "casements",
        title: "Casement Windows",
        cardImage: require('../assets/casement-windows-card-image.png'),
        tagline: "Strong, energy efficient, and timeless.",
        heroImage: require('../assets/windows/casement-windows/main-image.jpg'),
        about: "Casement Windows remain highly favoured among UK homeowners, blending timeless aesthetics with robust frame materials celebrated for their strength, energy efficiency, and minimal upkeep needs.\n\nThe term \u201Ccasement\u201D denotes a window style where the sash connects to the frame via hinges, enabling outward opening for superior ventilation and effortless cleaning access.\n\nAvailable in a diverse array of customisation options such as frame styles, finishes, colours, and handles, PVCu casement windows cater to a wide range of property types, ensuring their popularity across residential and commercial settings alike.",
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
              { image: require('../assets/windows/casement-windows/styles/bevelled-image.jpg'), label: "Bevelled" },
              { image: require('../assets/windows/casement-windows/styles/ovolo-image.jpg'), label: "Ovolo" },
            ]
          },
          {
            title: "Security Features",
            content: "A total of 10 security points around each opening window:\n\u2022 2 x steel shoot bolts\n\u2022 4 x central collared cams\n\u2022 2 x high security fire escape / easy clean hinges\n\u2022 2 x 15mm anti-jemmy hinge bolts",
            overviewImage: require('../assets/windows/casement-windows/security/LOCKING-POINTS-WHOLE.png'),
            images: [
              { image: require('../assets/windows/casement-windows/security/locking-point-1.png'), label: "Steel Shoot Bolts" },
              { image: require('../assets/windows/casement-windows/security/locking-point-2.png'), label: "Collared Cams" },
              { image: require('../assets/windows/casement-windows/security/locking-point-3.png'), label: "Fire Escape Hinges" },
              { image: require('../assets/windows/casement-windows/security/locking-point-4.png'), label: "Anti-Jemmy Bolts" },
            ]
          },
          {
            title: "Standard Handles",
            content: "Choose from a range of premium handle finishes to complement your window style.",
            images: [
              { image: require('../assets/windows/hardware/white.png'), label: "White" },
              { image: require('../assets/windows/hardware/black.png'), label: "Black" },
              { image: require('../assets/windows/hardware/gold.png'), label: "Gold" },
              { image: require('../assets/windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
              { image: require('../assets/windows/hardware/satin-silver.png'), label: "Satin Silver" },
              { image: require('../assets/windows/hardware/graphite.png'), label: "Graphite" },
              { image: require('../assets/windows/hardware/bronze.png'), label: "Bronze" },
              { image: require('../assets/windows/hardware/forged-black.png'), label: "Forged Black" },
            ]
          },
          {
            title: "Heritage Handles",
            content: "Our heritage and monkey tail handle collection, designed for properties with a traditional character.",
            images: [
              { image: require('../assets/windows/hardware/gold-heritage.png'), label: "Gold Heritage" },
              { image: require('../assets/windows/hardware/polished-chrome-heritage.png'), label: "Chrome Heritage" },
              { image: require('../assets/windows/hardware/graphite-heritage.png'), label: "Graphite Heritage" },
              { image: require('../assets/windows/hardware/forged-black-heritage.png'), label: "Forged Black Heritage" },
              { image: require('../assets/windows/hardware/gold-monkey-tail.png'), label: "Gold Monkey Tail" },
              { image: require('../assets/windows/hardware/polished-chrome-monkey-tail.png'), label: "Chrome Monkey Tail" },
              { image: require('../assets/windows/hardware/graphite-monkey-tail.png'), label: "Graphite Monkey Tail" },
              { image: require('../assets/windows/hardware/forged-black-monkey-tail.png'), label: "Forged Black Monkey Tail" },
            ]
          }
        ],
        colours: [
          {
            title: "Standard Colours",
            content: "Our standard colour range is available with short lead times.",
            swatches: [
              { image: require('../assets/windows/colours/standard/WHITE.png'), label: "White" },
              { image: require('../assets/windows/colours/standard/WHITE-GRAIN.png'), label: "White Grain" },
              { image: require('../assets/windows/colours/standard/ICE-CREAM-GRAINED.png'), label: "Ice Cream Grained" },
              { image: require('../assets/windows/colours/standard/ICE-CREAM-ON-WHITE.png'), label: "Ice Cream on White" },
              { image: require('../assets/windows/colours/standard/CHERRYWOOD.png'), label: "Cherrywood" },
              { image: require('../assets/windows/colours/standard/CHERRYWOOD-ON-WHITE.png'), label: "Cherrywood on White" },
              { image: require('../assets/windows/colours/standard/ROSEWOOD-2.png'), label: "Rosewood" },
              { image: require('../assets/windows/colours/standard/ROSEWOOD-ON-WHITE.png'), label: "Rosewood on White" },
              { image: require('../assets/windows/colours/standard/IRISH-OAK-2.png'), label: "Irish Oak" },
              { image: require('../assets/windows/colours/standard/ANTHRACITE-GREY-ON-WHITE.png'), label: "Anthracite Grey on White" },
              { image: require('../assets/windows/colours/standard/BLACK-GRAINED-ON-WHITE.png'), label: "Black Grained on White" },
            ]
          },
          {
            title: "Extended Lead Time",
            content: "These colours are available with an extended lead time.",
            swatches: [
              { image: require('../assets/windows/colours/extended/ANTHRACITE-GREY.png'), label: "Anthracite Grey" },
              { image: require('../assets/windows/colours/extended/SMOOTH-ANTHRACITE-GREY.png'), label: "Smooth Anthracite Grey" },
              { image: require('../assets/windows/colours/extended/SMOOTH-ANTHRACITEE-GREY-ON-WHITE.png'), label: "Smooth Anthracite Grey on White" },
              { image: require('../assets/windows/colours/extended/ANTHRACITE-GREY-ON-WHITE-GRAINED.png'), label: "Anthracite Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/AGATE-GREY-ON-WHITE.png'), label: "Agate Grey on White" },
              { image: require('../assets/windows/colours/extended/AGATE-GREY-ON-WHITE-GRAINED.png'), label: "Agate Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/FRENCH-GREY-ON-WHITE.png'), label: "French Grey on White" },
              { image: require('../assets/windows/colours/extended/FRENCH-GREY-ON-WHITE-GRAINED.png'), label: "French Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/LIGHT-GREY-ON-WHITE.png'), label: "Light Grey on White" },
              { image: require('../assets/windows/colours/extended/SILVER-GREY-ON-WHITE.png'), label: "Silver Grey on White" },
              { image: require('../assets/windows/colours/extended/CHARTWELL-GREEN-ON-WHITE.png'), label: "Chartwell Green on White" },
              { image: require('../assets/windows/colours/extended/IRISH-OAK-ON-WHITE.png'), label: "Irish Oak on White" },
            ]
          },
          {
            title: "Specials",
            content: "Special order colours for unique projects.",
            swatches: [
              { image: require('../assets/windows/colours/specials/AGATE-GREY.png'), label: "Agate Grey" },
              { image: require('../assets/windows/colours/specials/BLACK-1.png'), label: "Black" },
              { image: require('../assets/windows/colours/specials/BLACK-ON-WHITE-GRAINED.png'), label: "Black on White Grained" },
              { image: require('../assets/windows/colours/specials/BALMORAL-GREY-ON-WHITE-GRAINED.png'), label: "Balmoral Grey on White Grained" },
              { image: require('../assets/windows/colours/specials/ICE-CREAM-ON-WHITE-GRAINED.png'), label: "Ice Cream on White Grained" },
              { image: require('../assets/windows/colours/specials/IVORY-ON-WHITE-GRAINED.png'), label: "Ivory on White Grained" },
              { image: require('../assets/windows/colours/specials/ROSEWOOD-ON-WHITE-GRAINED.png'), label: "Rosewood on White Grained" },
            ]
          }
        ],
        extras: [
          {
            title: "Concealed Trickle Vents",
            content: "This ventilation system is integrated into the head of the outer frame and is concealed by a full-width aluminium exterior canopy, perfectly matched in colour and finish to the window frames.",
            image: require('../assets/windows/EXTRAS/concealed-vent.jpg')
          },
          {
            title: "Authentic Georgian Bar",
            content: "The Georgian Bar system features a unique astragal clip-on design. These scribed PVCu bars are precisely colour-matched to blend seamlessly with the chosen window finish.",
            image: require('../assets/windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
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
        heroImage: require('../assets/windows/flush-casements/main-image.jpg'),
        about: "PVCu Flush Casement Windows offer a modern twist on a classic design. While perfect for traditional properties, they have also gained popularity in contemporary homes.\n\nUnlike traditional casement windows, where the sash overlaps the frame, flush casement windows have a sash that sits level with the frame when closed, creating a sleek and streamlined look.\n\nWith a variety of customisation options available, including finishes, colours, and handles, PVCu Flush Casement Windows are an excellent choice for projects seeking a refined and elegant appearance.",
        stats: {
          rating: "4.9",
          reviews: "699",
          completed: "1,200+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Frame Styles",
            content: "Your initial choice revolves around selecting the window profile: either mechanical joined or welded. This decision is typically guided by the property's architectural style or personal taste preferences.",
            images: []
          },
          {
            title: "Security Features",
            content: "A total of 10 security points around each opening window:\n\u2022 2 x steel shoot bolts\n\u2022 4 x central collared cams\n\u2022 2 x high security fire escape / easy clean hinges\n\u2022 2 x 15mm anti-jemmy hinge bolts",
            images: []
          },
          {
            title: "Standard Handles",
            content: "Choose from a range of premium handle finishes to complement your window style.",
            images: [
              { image: require('../assets/windows/hardware/white.png'), label: "White" },
              { image: require('../assets/windows/hardware/black.png'), label: "Black" },
              { image: require('../assets/windows/hardware/gold.png'), label: "Gold" },
              { image: require('../assets/windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
              { image: require('../assets/windows/hardware/satin-silver.png'), label: "Satin Silver" },
              { image: require('../assets/windows/hardware/graphite.png'), label: "Graphite" },
              { image: require('../assets/windows/hardware/bronze.png'), label: "Bronze" },
              { image: require('../assets/windows/hardware/forged-black.png'), label: "Forged Black" },
            ]
          },
          {
            title: "Heritage Handles",
            content: "Our heritage and monkey tail handle collection, designed for properties with a traditional character.",
            images: [
              { image: require('../assets/windows/hardware/gold-heritage.png'), label: "Gold Heritage" },
              { image: require('../assets/windows/hardware/polished-chrome-heritage.png'), label: "Chrome Heritage" },
              { image: require('../assets/windows/hardware/graphite-heritage.png'), label: "Graphite Heritage" },
              { image: require('../assets/windows/hardware/forged-black-heritage.png'), label: "Forged Black Heritage" },
              { image: require('../assets/windows/hardware/gold-monkey-tail.png'), label: "Gold Monkey Tail" },
              { image: require('../assets/windows/hardware/polished-chrome-monkey-tail.png'), label: "Chrome Monkey Tail" },
              { image: require('../assets/windows/hardware/graphite-monkey-tail.png'), label: "Graphite Monkey Tail" },
              { image: require('../assets/windows/hardware/forged-black-monkey-tail.png'), label: "Forged Black Monkey Tail" },
            ]
          }
        ],
        colours: [
          {
            title: "Standard Colours",
            content: "Whatever style and finish you desire, the Ultimate Collection provides a wide selection to meet your needs. Our standard colour range is available with short lead times.",
            swatches: [
              { image: require('../assets/windows/colours/standard/WHITE.png'), label: "White" },
              { image: require('../assets/windows/colours/standard/WHITE-GRAIN.png'), label: "White Grain" },
              { image: require('../assets/windows/colours/standard/ICE-CREAM-GRAINED.png'), label: "Ice Cream Grained" },
              { image: require('../assets/windows/colours/standard/ICE-CREAM-ON-WHITE.png'), label: "Ice Cream on White" },
              { image: require('../assets/windows/colours/standard/CHERRYWOOD.png'), label: "Cherrywood" },
              { image: require('../assets/windows/colours/standard/CHERRYWOOD-ON-WHITE.png'), label: "Cherrywood on White" },
              { image: require('../assets/windows/colours/standard/ROSEWOOD-2.png'), label: "Rosewood" },
              { image: require('../assets/windows/colours/standard/ROSEWOOD-ON-WHITE.png'), label: "Rosewood on White" },
              { image: require('../assets/windows/colours/standard/IRISH-OAK-2.png'), label: "Irish Oak" },
              { image: require('../assets/windows/colours/standard/ANTHRACITE-GREY-ON-WHITE.png'), label: "Anthracite Grey on White" },
              { image: require('../assets/windows/colours/standard/BLACK-GRAINED-ON-WHITE.png'), label: "Black Grained on White" },
            ]
          },
          {
            title: "Extended Lead Time",
            content: "These colours are available with an extended lead time.",
            swatches: [
              { image: require('../assets/windows/colours/extended/ANTHRACITE-GREY.png'), label: "Anthracite Grey" },
              { image: require('../assets/windows/colours/extended/SMOOTH-ANTHRACITE-GREY.png'), label: "Smooth Anthracite Grey" },
              { image: require('../assets/windows/colours/extended/SMOOTH-ANTHRACITEE-GREY-ON-WHITE.png'), label: "Smooth Anthracite Grey on White" },
              { image: require('../assets/windows/colours/extended/ANTHRACITE-GREY-ON-WHITE-GRAINED.png'), label: "Anthracite Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/AGATE-GREY-ON-WHITE.png'), label: "Agate Grey on White" },
              { image: require('../assets/windows/colours/extended/AGATE-GREY-ON-WHITE-GRAINED.png'), label: "Agate Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/FRENCH-GREY-ON-WHITE.png'), label: "French Grey on White" },
              { image: require('../assets/windows/colours/extended/FRENCH-GREY-ON-WHITE-GRAINED.png'), label: "French Grey on White Grained" },
              { image: require('../assets/windows/colours/extended/LIGHT-GREY-ON-WHITE.png'), label: "Light Grey on White" },
              { image: require('../assets/windows/colours/extended/SILVER-GREY-ON-WHITE.png'), label: "Silver Grey on White" },
              { image: require('../assets/windows/colours/extended/CHARTWELL-GREEN-ON-WHITE.png'), label: "Chartwell Green on White" },
              { image: require('../assets/windows/colours/extended/IRISH-OAK-ON-WHITE.png'), label: "Irish Oak on White" },
            ]
          },
          {
            title: "Specials",
            content: "Special order colours for unique projects.",
            swatches: [
              { image: require('../assets/windows/colours/specials/AGATE-GREY.png'), label: "Agate Grey" },
              { image: require('../assets/windows/colours/specials/BLACK-1.png'), label: "Black" },
              { image: require('../assets/windows/colours/specials/BLACK-ON-WHITE-GRAINED.png'), label: "Black on White Grained" },
              { image: require('../assets/windows/colours/specials/BALMORAL-GREY-ON-WHITE-GRAINED.png'), label: "Balmoral Grey on White Grained" },
              { image: require('../assets/windows/colours/specials/ICE-CREAM-ON-WHITE-GRAINED.png'), label: "Ice Cream on White Grained" },
              { image: require('../assets/windows/colours/specials/IVORY-ON-WHITE-GRAINED.png'), label: "Ivory on White Grained" },
              { image: require('../assets/windows/colours/specials/ROSEWOOD-ON-WHITE-GRAINED.png'), label: "Rosewood on White Grained" },
            ]
          }
        ],
        extras: [
          {
            title: "Trickle Vents",
            content: "As of June 15, 2022, Building Regulations under Approved Document F mandate that adequate ventilation must be ensured throughout a property. Ultimate Collection Windows are designed to meet these requirements with a safe, secure, and efficient trickle vent system. Ventilators are colour-matched to your chosen frame with hooded external canopies to prevent water and insects from entering."
          },
          {
            title: "Concealed Trickle Vents",
            content: "This ventilation system is integrated into the head of the outer frame and is concealed by a full-width aluminium exterior canopy, perfectly matched in colour and finish to the window frames. On the interior, the same link vents with closure plates are used, ensuring consistent performance and a seamless appearance.",
            image: require('../assets/windows/EXTRAS/concealed-vent.jpg')
          },
          {
            title: "Authentic Georgian Bar",
            content: "The Georgian Bar system features a unique astragal clip-on design. These scribed PVCu bars are precisely colour-matched to blend seamlessly with the chosen window finish. The bars are securely attached to full-length aluminium fixing strips that are bonded to the glass unit, creating the visual effect of individual panes.",
            image: require('../assets/windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
          },
          {
            title: "Integral Blinds",
            content: "Integral blinds offer a sleek and practical solution for controlling light and privacy, all while maintaining a clean and modern look. Sealed between the panes of a double-glazed unit, they stay dust-free and protected from damage, making them a durable, low-maintenance alternative to traditional blinds."
          }
        ],
        galleryAlbumName: "Heritage Windows and Doors - Residence (R7 & R9) & VEKA Flush Sash",
      },
      {
        id: "residence",
        title: "Residence Windows",
        cardImage: require('../assets/resiedence-card-image.jpg'),
        subcategories: [
          {
            id: "r7",
            title: "R7 Windows",
            cardImage: require('../assets/windows/residence/r7/r7-card-image.jpg'),
            tagline: "Beautifully flush inside and out.",
            heroImage: require('../assets/windows/residence/r7/main-image.jpg'),
            about: "Residence 7 stands ready to inspire you on your quest to create your dream home. With a beautifully flush appearance both inside and out, it comes in a selection of hassle-free finishes and styles, offering versatility without complexity.\n\nOutperforming many other systems, R7 boasts a sophisticated seven-chamber design and smart features engineered for optimal performance.\n\nEmbark on your journey with Residence 7 today and discover the perfect blend of elegance and functionality for your home.",
            stats: {
              rating: "4.9",
              reviews: "350",
              completed: "600+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Modern Living",
                content: "Residence 7 has been meticulously crafted to accommodate a variety of manufacturing techniques. Choose from a traditional mechanical joint for a timeless timber alternative look, or opt for a modern touch with diagonal mitre welding or seamless Graf weld options.\n\nPersonalize your home with luxurious colour finishes and bespoke hardware choices, each meticulously designed to enhance efficiency, security, and aesthetic appeal.",
                images: []
              },
              {
                title: "Colour & Finish Options",
                content: "Whatever style and finish you envision for your casement windows, the Residence Collection offers a diverse array to suit your preferences.\n\nBeautifully flush inside and out, Residence 7 stands out with its seamless integration into any architectural style. It offers a wide selection of maintenance-free finishes, ensuring durability and effortless upkeep. Whether your preference leans towards classic elegance or contemporary sleekness, Residence 7 embodies versatility without any complexity, making it an ideal choice for transforming the aesthetic of your home with ease.",
                images: []
              },
              {
                title: "Standard Handles",
                content: "Choose from a range of premium handle finishes to complement your window style.",
                images: [
                  { image: require('../assets/windows/hardware/white.png'), label: "White" },
                  { image: require('../assets/windows/hardware/black.png'), label: "Black" },
                  { image: require('../assets/windows/hardware/gold.png'), label: "Gold" },
                  { image: require('../assets/windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
                  { image: require('../assets/windows/hardware/satin-silver.png'), label: "Satin Silver" },
                  { image: require('../assets/windows/hardware/graphite.png'), label: "Graphite" },
                  { image: require('../assets/windows/hardware/bronze.png'), label: "Bronze" },
                  { image: require('../assets/windows/hardware/forged-black.png'), label: "Forged Black" },
                ]
              },
              {
                title: "Heritage Handles",
                content: "Our heritage and monkey tail handle collection, designed for properties with a traditional character.",
                images: [
                  { image: require('../assets/windows/hardware/gold-heritage.png'), label: "Gold Heritage" },
                  { image: require('../assets/windows/hardware/polished-chrome-heritage.png'), label: "Chrome Heritage" },
                  { image: require('../assets/windows/hardware/graphite-heritage.png'), label: "Graphite Heritage" },
                  { image: require('../assets/windows/hardware/forged-black-heritage.png'), label: "Forged Black Heritage" },
                  { image: require('../assets/windows/hardware/gold-monkey-tail.png'), label: "Gold Monkey Tail" },
                  { image: require('../assets/windows/hardware/polished-chrome-monkey-tail.png'), label: "Chrome Monkey Tail" },
                  { image: require('../assets/windows/hardware/graphite-monkey-tail.png'), label: "Graphite Monkey Tail" },
                  { image: require('../assets/windows/hardware/forged-black-monkey-tail.png'), label: "Forged Black Monkey Tail" },
                ]
              }
            ],
            colours: [
              {
                title: "Residence Colours",
                content: "The Residence Collection offers a diverse array of colour finishes to suit your preferences. Please note that colour samples displayed are for illustrative purposes and may not be universally available across all profile types.",
                swatches: [
                  { image: require('../assets/windows/residence/colours/CHALK-WHITE-1.png'), label: "Chalk White" },
                  { image: require('../assets/windows/residence/colours/CLOTTED-CREAM-1.png'), label: "Clotted Cream" },
                  { image: require('../assets/windows/residence/colours/VINTAGE-CREAM-1.png'), label: "Vintage Cream" },
                  { image: require('../assets/windows/residence/colours/GRAINED-WHITE-1.png'), label: "Grained White" },
                  { image: require('../assets/windows/residence/colours/PAINSWICK-1.png'), label: "Painswick" },
                  { image: require('../assets/windows/residence/colours/CORSE-LAWN-1.png'), label: "Corse Lawn" },
                  { image: require('../assets/windows/residence/colours/COTSWOLD-GREEN-1.png'), label: "Cotswold Green" },
                  { image: require('../assets/windows/residence/colours/ELECTRIC-GREY-1.png'), label: "Electric Grey" },
                  { image: require('../assets/windows/residence/colours/NO.-38-GREY-1.png'), label: "No. 38 Grey" },
                  { image: require('../assets/windows/residence/colours/NO.10-BLACK.png'), label: "No. 10 Black" },
                  { image: require('../assets/windows/residence/colours/ENGLISH-OAK-1.png'), label: "English Oak" },
                  { image: require('../assets/windows/residence/colours/GOLDEN-OAK-1.png'), label: "Golden Oak" },
                  { image: require('../assets/windows/residence/colours/IRISH-OAK-1.png'), label: "Irish Oak" },
                  { image: require('../assets/windows/residence/colours/ROSEWOOD-1.png'), label: "Rosewood" },
                ]
              }
            ],
            extras: [
              {
                title: "Concealed Trickle Vents",
                content: "This ventilation system is integrated into the head of the outer frame and is concealed by a full-width aluminium exterior canopy, perfectly matched in colour and finish to the window frames.",
                image: require('../assets/windows/EXTRAS/concealed-vent.jpg')
              },
              {
                title: "Authentic Georgian Bar",
                content: "The Georgian Bar system features a unique astragal clip-on design. These scribed PVCu bars are precisely colour-matched to blend seamlessly with the chosen window finish.",
                image: require('../assets/windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
              },
              {
                title: "Integral Blinds",
                content: "Integral blinds offer a sleek and practical solution for controlling light and privacy. Sealed between the panes of a double-glazed unit, they stay dust-free and protected from damage."
              }
            ],
            galleryAlbumName: "Heritage Windows and Doors - Residence (R7 & R9) & VEKA Flush Sash",
          },
          {
            id: "r9",
            title: "R9 Windows",
            cardImage: require('../assets/windows/residence/r9/r9-card-image.jpg'),
            tagline: "Replicate the 19th Century Flush Sash.",
            heroImage: require('../assets/windows/residence/r9/main-image.jpg'),
            about: "Residence 9 celebrates its UK origins, meticulously crafted with enduring British architectural designs in mind. Offering a myriad of bespoke options, it caters to diverse homes, from the grandeur of stately residences to the timeless charm of Georgian and Victorian properties, as well as contemporary homes of today.\n\nYou'll quickly appreciate the benefits of the thermally efficient 9-chamber design and modern glazing, which enhance your home's energy efficiency while preserving its traditional charm, expertly revitalized by Residence 9.",
            stats: {
              rating: "4.9",
              reviews: "699",
              completed: "1,200+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Heritage Charm",
                content: "Residence 9 offers a comprehensive solution for your property, faithfully replicating the flush timber designs found in heritage properties across towns, villages, and cities. It allows you to upgrade your windows and doors with authentic design and heritage colours, maintaining the period's character appearance and feel.\n\nPersonalize your home with luxurious colour finishes and bespoke hardware choices, each meticulously designed to enhance efficiency, security, and aesthetic appeal.",
                images: []
              },
              {
                title: "Colour & Finish Options",
                content: "Whatever style and finish you envision for your casement windows, the Residence Collection offers a diverse array to suit your preferences.\n\nResidence 9 embodies a window and door system meticulously crafted to faithfully replicate the elegant timber designs of the 19th century. Its traditional flush exterior and beautifully adorned interior combine to evoke a timeless aesthetic of classic elegance. Ideal for heritage properties or those seeking to add a touch of traditional charm to their home, Residence 9 offers both authenticity and enduring style.",
                images: []
              },
              {
                title: "Standard Handles",
                content: "Choose from a range of premium handle finishes to complement your window style.",
                images: [
                  { image: require('../assets/windows/hardware/white.png'), label: "White" },
                  { image: require('../assets/windows/hardware/black.png'), label: "Black" },
                  { image: require('../assets/windows/hardware/gold.png'), label: "Gold" },
                  { image: require('../assets/windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
                  { image: require('../assets/windows/hardware/satin-silver.png'), label: "Satin Silver" },
                  { image: require('../assets/windows/hardware/graphite.png'), label: "Graphite" },
                  { image: require('../assets/windows/hardware/bronze.png'), label: "Bronze" },
                  { image: require('../assets/windows/hardware/forged-black.png'), label: "Forged Black" },
                ]
              },
              {
                title: "Heritage Handles",
                content: "Our heritage and monkey tail handle collection, designed for properties with a traditional character.",
                images: [
                  { image: require('../assets/windows/hardware/gold-heritage.png'), label: "Gold Heritage" },
                  { image: require('../assets/windows/hardware/polished-chrome-heritage.png'), label: "Chrome Heritage" },
                  { image: require('../assets/windows/hardware/graphite-heritage.png'), label: "Graphite Heritage" },
                  { image: require('../assets/windows/hardware/forged-black-heritage.png'), label: "Forged Black Heritage" },
                  { image: require('../assets/windows/hardware/gold-monkey-tail.png'), label: "Gold Monkey Tail" },
                  { image: require('../assets/windows/hardware/polished-chrome-monkey-tail.png'), label: "Chrome Monkey Tail" },
                  { image: require('../assets/windows/hardware/graphite-monkey-tail.png'), label: "Graphite Monkey Tail" },
                  { image: require('../assets/windows/hardware/forged-black-monkey-tail.png'), label: "Forged Black Monkey Tail" },
                ]
              }
            ],
            colours: [
              {
                title: "Residence Colours",
                content: "The Residence Collection offers a diverse array of colour finishes to suit your preferences. Please note that colour samples displayed are for illustrative purposes and may not be universally available across all profile types.",
                swatches: [
                  { image: require('../assets/windows/residence/colours/CHALK-WHITE-1.png'), label: "Chalk White" },
                  { image: require('../assets/windows/residence/colours/CLOTTED-CREAM-1.png'), label: "Clotted Cream" },
                  { image: require('../assets/windows/residence/colours/VINTAGE-CREAM-1.png'), label: "Vintage Cream" },
                  { image: require('../assets/windows/residence/colours/GRAINED-WHITE-1.png'), label: "Grained White" },
                  { image: require('../assets/windows/residence/colours/PAINSWICK-1.png'), label: "Painswick" },
                  { image: require('../assets/windows/residence/colours/CORSE-LAWN-1.png'), label: "Corse Lawn" },
                  { image: require('../assets/windows/residence/colours/COTSWOLD-GREEN-1.png'), label: "Cotswold Green" },
                  { image: require('../assets/windows/residence/colours/ELECTRIC-GREY-1.png'), label: "Electric Grey" },
                  { image: require('../assets/windows/residence/colours/NO.-38-GREY-1.png'), label: "No. 38 Grey" },
                  { image: require('../assets/windows/residence/colours/NO.10-BLACK.png'), label: "No. 10 Black" },
                  { image: require('../assets/windows/residence/colours/ENGLISH-OAK-1.png'), label: "English Oak" },
                  { image: require('../assets/windows/residence/colours/GOLDEN-OAK-1.png'), label: "Golden Oak" },
                  { image: require('../assets/windows/residence/colours/IRISH-OAK-1.png'), label: "Irish Oak" },
                  { image: require('../assets/windows/residence/colours/ROSEWOOD-1.png'), label: "Rosewood" },
                ]
              }
            ],
            extras: [
              {
                title: "Concealed Trickle Vents",
                content: "This ventilation system is integrated into the head of the outer frame and is concealed by a full-width aluminium exterior canopy, perfectly matched in colour and finish to the window frames.",
                image: require('../assets/windows/EXTRAS/concealed-vent.jpg')
              },
              {
                title: "Authentic Georgian Bar",
                content: "The Georgian Bar system features a unique astragal clip-on design. These scribed PVCu bars are precisely colour-matched to blend seamlessly with the chosen window finish.",
                image: require('../assets/windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
              },
              {
                title: "Integral Blinds",
                content: "Integral blinds offer a sleek and practical solution for controlling light and privacy. Sealed between the panes of a double-glazed unit, they stay dust-free and protected from damage."
              }
            ],
            galleryAlbumName: "Heritage Windows and Doors - Residence (R7 & R9) & VEKA Flush Sash",
          }
        ]
      },
      {
        id: "aluminium",
        title: "Aluminium Windows",
        cardImage: require('../assets/aluminium-windows-card-image.jpg'),
        tagline: "Sleek, strong aluminium frames.",
        heroImage: require('../assets/windows/aluminium-windows/main-image.jpg'),
        about: "Aluminium Windows, Doors, and Conservatories from Bradley Scott Windows. Modern aluminium frames offer an incredibly sleek profile and outstanding durability.\nPerfect for adding a contemporary look to any property while ensuring state-of-the-art security and thermal performance.",
        stats: {
          rating: "4.9",
          reviews: "699",
          completed: "1,200+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Frame Styles",
            content: "Aluminium Windows offer a selection of 3 distinct styles:\n\nContemporary Window: Modern styling, ideal for today’s homes.\n\nFlush Window: Timeless look for a seamless blend.\n\nHeritage Window: Vintage charm for historic homes.",
            images: [
              { image: require('../assets/windows/aluminium-windows/frame-styles/contemporary.jpg'), label: "Contemporary" },
              { image: require('../assets/windows/aluminium-windows/frame-styles/flush.jpg'), label: "Flush" },
              { image: require('../assets/windows/aluminium-windows/frame-styles/heritage.jpg'), label: "Heritage" }
            ]
          },
          {
            title: "Standard Handles",
            content: "Choose from a range of premium handle finishes to complement your window style.",
            images: [
              { image: require('../assets/windows/hardware/white.png'), label: "White" },
              { image: require('../assets/windows/hardware/black.png'), label: "Black" },
              { image: require('../assets/windows/hardware/gold.png'), label: "Gold" },
              { image: require('../assets/windows/hardware/polished-chrome.png'), label: "Polished Chrome" },
              { image: require('../assets/windows/hardware/satin-silver.png'), label: "Satin Silver" },
              { image: require('../assets/windows/hardware/graphite.png'), label: "Graphite" },
              { image: require('../assets/windows/hardware/bronze.png'), label: "Bronze" },
              { image: require('../assets/windows/hardware/forged-black.png'), label: "Forged Black" },
            ]
          },
          {
            title: "Heritage Handles",
            content: "Our heritage and monkey tail handle collection, designed for properties with a traditional character.",
            images: [
              { image: require('../assets/windows/hardware/gold-heritage.png'), label: "Gold Heritage" },
              { image: require('../assets/windows/hardware/polished-chrome-heritage.png'), label: "Chrome Heritage" },
              { image: require('../assets/windows/hardware/graphite-heritage.png'), label: "Graphite Heritage" },
              { image: require('../assets/windows/hardware/forged-black-heritage.png'), label: "Forged Black Heritage" },
              { image: require('../assets/windows/hardware/gold-monkey-tail.png'), label: "Gold Monkey Tail" },
              { image: require('../assets/windows/hardware/polished-chrome-monkey-tail.png'), label: "Chrome Monkey Tail" },
              { image: require('../assets/windows/hardware/graphite-monkey-tail.png'), label: "Graphite Monkey Tail" },
              { image: require('../assets/windows/hardware/forged-black-monkey-tail.png'), label: "Forged Black Monkey Tail" },
            ]
          }
        ],
        colours: [
          {
            title: "Standard Colours",
            content: "Our standard colour range is available with short lead times.",
            swatches: [
              { image: require('../assets/windows/aluminium-windows/colours/standard/WHITE-9016.png'), label: "White 9016" },
              { image: require('../assets/windows/aluminium-windows/colours/standard/BLACK-9005.png'), label: "Black 9005" },
              { image: require('../assets/windows/aluminium-windows/colours/standard/GREY-7016.png'), label: "Grey 7016" }
            ]
          },
          {
            title: "Extended Lead Time",
            content: "These colours are available with an extended lead time.",
            swatches: [
              { image: require('../assets/windows/aluminium-windows/colours/extended/AGATE-GREY-EXTERNAL-WHITE-INTERNAL-qznye980s7mkkzzck0r4wvjt5ym2kyh7gxoq67s4iw.png'), label: "Agate Grey / White" },
              { image: require('../assets/windows/aluminium-windows/colours/extended/BLACK-EXTERNAL-WHITE-INTERNAL-qznye980s7mkkzzck0r4wvjt5ym2kyh7gxoq67s4iw.png'), label: "Black / White" },
              { image: require('../assets/windows/aluminium-windows/colours/extended/FRENCH-GREY-EXTERNAL-WHITE-INTERNAL-qznyea5uz1nuwlxzej5rhdb9rchfsnkxt2c7nhqqco.png'), label: "French Grey / White" },
              { image: require('../assets/windows/aluminium-windows/colours/extended/GREY-EXTERNAL-WHITE-INTERNAL-qznyea5uz1nuwlxzej5rhdb9rchfsnkxt2c7nhqqco.png'), label: "Grey / White" }
            ]
          }
        ],
        extras: [
          {
            title: "Thermal Performance",
            content: "The sophisticated aluminium chambered profile, and high-performance insulated glass sealed units used in our windows effectively retain heat within properties."
          },
          {
            title: "Guaranteed Safety",
            content: "Our windows feature standard safety glass, complying with Building Regulation requirements. This ensures that in case of accidental glass breakage, the risk of injury from sharp glass edges is minimized."
          },
          {
            title: "Precision Crafted",
            content: "The PANORAMA slimline window was meticulously crafted by a seasoned team of engineers. Crafted from top-quality materials, PANORAMA guarantees exceptional durability, weather resistance, and outstanding insulation."
          },
          {
            title: "Integral Blinds",
            content: "Integral blinds offer a sleek and practical solution for controlling light and privacy, all while maintaining a clean and modern look. Sealed between the panes of a double-glazed unit, they stay dust-free and protected from damage."
          }
        ],
        galleryAlbumName: "Aluminium Windows"
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
    tagline: "Bring light and elegance into your home.",
    image: require('../assets/roof-lanterns-category-image.webp'),
    heroImage: require('../assets/lanterns/roof-latern-main-image.webp'),
    about: "Bradley Scott Windows provides a stunning selection of lantern and flat roof systems, designed to bring light and elegance into your home. With sleek profiles and superior thermal performance, our lanterns maximize natural light while offering a modern, low-maintenance solution.\n\nBuilt with an innovative thermally broken system, these roofs provide excellent thermal insulation. For a truly minimalist look, the innovative contemporary design supports the ridge with hip rafters, creating an ultra-slim, clean, and modern aesthetic.",
    stats: {
      rating: "4.9",
      reviews: "215",
      completed: "500+"
    },
    priceLabel: "Price on Request",
    subcategories: [],
    details: [
      {
        title: "Lantern Options",
        content: "Our lantern roofs are available in versatile designs, including 2-way, 3-way, 4-way, or contemporary options, with sizes up to 3m x 6m, making them perfect for modern living spaces.\n\nChoose from self-cleaning glass options in blue, aqua green, or neutral grey tints, with up to 82% solar reflection. Energy-efficient glazing offers U Values between 1.59 and 1.93, ensuring comfort and performance year-round."
      },
      {
        title: "Lantern Styles",
        content: "Explore our range of stylish contemporary designs with minimal profiles to suit your home's aesthetic.",
        carouselImages: [
          { image: require('../assets/lanterns/styles/Style-02-Anthracite.webp'), label: "Style 2 Anthracite" },
          { image: require('../assets/lanterns/styles/Style-03-Anthracite.webp'), label: "Style 3 Anthracite" },
          { image: require('../assets/lanterns/styles/Style-04-Anthracite.webp'), label: "Style 4 Anthracite" },
          { image: require('../assets/lanterns/styles/Style-05-Anthracite.webp'), label: "Style 5 Anthracite" },
          { image: require('../assets/lanterns/styles/Style-06-Black.webp'), label: "Style 6 Black" },
          { image: require('../assets/lanterns/styles/Style-07-Black.webp'), label: "Style 7 Black" },
          { image: require('../assets/lanterns/styles/Style-08-Black.webp'), label: "Style 8 Black" },
          { image: require('../assets/lanterns/styles/Style-09-Black.webp'), label: "Style 9 Black" },
          { image: require('../assets/lanterns/styles/Style-10-White.webp'), label: "Style 10 White" },
          { image: require('../assets/lanterns/styles/Style-11-White.webp'), label: "Style 11 White" },
        ]
      },
      {
        title: "Flat Rooflights",
        content: "Our flat rooflights are designed with a sleek, edge-to-edge glass exterior that not only looks stunning but offers practical benefits as well. The innovative design ensures water glides effortlessly off the surface, without interference from perimeter sealants or frames.\n\nWith a slim profile standing just 63mm above the roof upstand, these rooflights blend seamlessly into any property, allowing maximum natural light to enter while maintaining a minimalist aesthetic.\n\nBeyond aesthetics, our flat rooflights provide year-round comfort by keeping unwanted heat out and maintaining a consistent ambient room temperature. The high-performance glazing and thermally broken aluminium frame deliver excellent thermal efficiency with a typical U-Value of 1.3 w/m²K, ensuring top-notch energy performance.",
        overviewImage: require('../assets/lanterns/flatroof/flat-roof-main-image.jpg'),
        overviewImageMode: 'cover'
      }
    ],
    colours: [
      {
        title: "Colour Options",
        content: "Choose from classic shades like black, grey, and white, or customize with any RAL colour to match your unique aesthetic preferences seamlessly.",
        swatches: [
          { image: require('../assets/lanterns/colours/WHITE.png'), label: "White" },
          { image: require('../assets/lanterns/colours/BLACK.png'), label: "Black" },
          { image: require('../assets/lanterns/colours/GREY.png'), label: "Grey" }
        ]
      }
    ],
    galleryAlbumName: "Aluminium Lanterns & Flat Rooflights"
  },
  {
    id: "commercial-work",
    title: "Commercial Work",
    image: require('../assets/commercial-category-image.jpg'),
    tagline: "Expertise for commercial & refurbishment projects.",
    heroImage: require('../assets/commercial/main-image.jpg'),
    about: "Bradley Scott Windows specialises in refurbishment projects and serves the commercial market, catering to a diverse range of sectors including schools, nursing homes, new car showrooms, colleges, sports halls, and hospitals.\n\nOur expertise extends beyond residential settings, ensuring that these facilities benefit from high-quality window solutions tailored to their specific needs. From enhancing energy efficiency and improving aesthetics to increasing security and ensuring compliance with industry standards, we provide comprehensive refurbishment services that prioritize functionality, durability, and cost-effectiveness.",
    stats: {
      rating: "5.0",
      reviews: "120",
      completed: "250+"
    },
    priceLabel: "Price on Request",
    subcategories: [],
    details: [
      {
         title: "Products & Profiles",
         content: "We offer UPVC windows in various colour profiles from industry-leading companies, including Optima, Rehau, Residence, Veka, and Spectus.\n\nAdditionally, we provide aluminium windows, doors, and curtain walling in any RAL Colour from any profile company. We can also offer electric opening doors, louvre doors, acoustic windows, and special shaped windows and doors."
      },
      {
         title: "Accreditations & Expertise",
         content: "We are able to offer a complete design and installation service. All of our trained staff have been CRB checked, hold CSCS cards, and possess an NVQ in fenestration (a recognized qualification)."
      },
      {
         title: "Our Contracts",
         content: "We have completed schemes in excess of £100,000 for various clients, including:\n• Mossvale Maintenance\n• Willmott Dixon\n• Mark Group\n• White Friers Housing Association\n• Trent and Dove Housing Association\n• Network Rail\n• Various Nursing Homes"
      }
    ],
    colours: [],
    extras: []
  },
  {
    id: "repairs",
    title: "Repairs",
    image: require('../assets/repairs-category-image.png'),
    tagline: "Comprehensive repair and servicing solutions.",
    heroImage: require('../assets/repairs/main-image.png'),
    about: "We specialize in comprehensive repair, maintenance, and servicing solutions for UPVC, timber, and aluminium windows.\n\nOur dedicated team is equipped with the expertise to handle a wide range of needs, ensuring your windows are kept in optimal condition year-round. Whether it’s addressing minor repairs, conducting routine maintenance checks, or providing extensive servicing, we prioritize quality craftsmanship and customer satisfaction.",
    stats: {
      rating: "4.9",
      reviews: "150",
      completed: "350+"
    },
    priceLabel: "Price on Request",
    subcategories: [],
    details: [
      {
        title: "Works We Carry Out",
        content: "• Replacement DG Units\n• Faulty Hinges\n• Window Handles\n• Faulty Door Locks\n• Faulty Locking Mechanisms\n• Door and Window adjustment\n• PVC Repairs (Filler and Polish)\n• Patio Door Wheels"
      },
      {
        title: "Spare Parts Availability",
        content: "We carry large stocks of spares for the window market and are able to match any spare parts for any windows profile system used. i.e. HW Plastics, Rehau, Profile 22, Deceuninck, Premier Profiles, Eurocell and any make of Double Glazed Unit."
      }
    ],
    extras: []
  },
  {
    id: "living-spaces",
    title: "Living Spaces",
    image: require('../assets/living-spaces-category-image.jpg'),
    subcategories: [
      {
        id: "conservatories",
        title: "Conservatories",
        cardImage: require('../assets/living-spaces/conservatories/card-image.jpg'),
        tagline: "Enhance your home with a beautiful conservatory.",
        heroImage: require('../assets/living-spaces/conservatories/card-image.jpg'),
        about: "Bradley Scott Windows offers an exceptional range of conservatories designed to enhance your home with both style and functionality.\n\nOur Classic conservatory roofing system from Ultraframe ensures a high level of thermal performance and design flexibility, allowing you to create a space that perfectly suits your needs.\n\nEach conservatory is meticulously crafted to blend seamlessly with your home's architecture, providing a durable and elegant addition that you can enjoy for years to come.",
        stats: {
          rating: "4.9",
          reviews: "250",
          completed: "600+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Glass Conservatory Roofs",
            content: "Our conservatory roofing system provides a wide array of design options and exceptional thermal performance, ensuring a top-quality addition to your home.\n\nOur advanced roof design features a robust ridge and an integrated structural support system, allowing for fewer bars, increased natural light, and uncompromised aesthetics."
          },
          {
            title: "Tiled Conservatory Roofs",
            content: "Our solid tiled roofs offer a classic, durable solution for extending your living space. Designed to provide superior insulation and energy efficiency, these roofs blend seamlessly with your home's existing architecture.\n\nThey combine the traditional appearance of tiled roofing with modern performance, ensuring a stylish and comfortable space that enhances both the look and functionality of your home."
          }
        ],
        glass: [
          {
            title: "Glass Options",
            content: "Elevate your conservatory with our self-cleaning glass options, designed for both beauty and convenience. Select from popular tints like clear, bronze, or grey to enhance your conservatory's ambiance while ensuring easy upkeep.",
            images: [
              { image: require('../assets/skyrooms/glass options/Neutral-glass.jpg'), label: "Self-Clean Neutral", resizeMode: "cover", fullHeight: true },
              { image: require('../assets/skyrooms/glass options/active-blue.jpg'), label: "Self-Clean Active Blue", resizeMode: "cover", fullHeight: true }
            ]
          }
        ],
        colours: [],
        extras: [],
        galleryAlbumName: "Conservatories & Conservatory Roofs"
      },
      {
        id: "roof-lanterns-sub",
        title: "Roof Lanterns",
        tagline: "Bring light and elegance into your home.",
        cardImage: require('../assets/living-spaces/lanterns/card-image.webp'),
        heroImage: require('../assets/living-spaces/lanterns/card-image.webp'),
        about: "Bradley Scott Windows provides a stunning selection of lantern and flat roof systems, designed to bring light and elegance into your home. With sleek profiles and superior thermal performance, our lanterns maximize natural light while offering a modern, low-maintenance solution.\n\nBuilt with an innovative thermally broken system, these roofs provide excellent thermal insulation. For a truly minimalist look, the innovative contemporary design supports the ridge with hip rafters, creating an ultra-slim, clean, and modern aesthetic.",
        stats: {
          rating: "4.9",
          reviews: "215",
          completed: "500+"
        },
        priceLabel: "Price on Request",
        subcategories: [],
        details: [
          {
            title: "Lantern Options",
            content: "Our lantern roofs are available in versatile designs, including 2-way, 3-way, 4-way, or contemporary options, with sizes up to 3m x 6m, making them perfect for modern living spaces.\n\nChoose from self-cleaning glass options in blue, aqua green, or neutral grey tints, with up to 82% solar reflection. Energy-efficient glazing offers U Values between 1.59 and 1.93, ensuring comfort and performance year-round."
          },
          {
            title: "Lantern Styles",
            content: "Explore our range of stylish contemporary designs with minimal profiles to suit your home's aesthetic.",
            carouselImages: [
              { image: require('../assets/lanterns/styles/Style-02-Anthracite.webp'), label: "Style 2 Anthracite" },
              { image: require('../assets/lanterns/styles/Style-03-Anthracite.webp'), label: "Style 3 Anthracite" },
              { image: require('../assets/lanterns/styles/Style-04-Anthracite.webp'), label: "Style 4 Anthracite" },
              { image: require('../assets/lanterns/styles/Style-05-Anthracite.webp'), label: "Style 5 Anthracite" },
              { image: require('../assets/lanterns/styles/Style-06-Black.webp'), label: "Style 6 Black" },
              { image: require('../assets/lanterns/styles/Style-07-Black.webp'), label: "Style 7 Black" },
              { image: require('../assets/lanterns/styles/Style-08-Black.webp'), label: "Style 8 Black" },
              { image: require('../assets/lanterns/styles/Style-09-Black.webp'), label: "Style 9 Black" },
              { image: require('../assets/lanterns/styles/Style-10-White.webp'), label: "Style 10 White" },
              { image: require('../assets/lanterns/styles/Style-11-White.webp'), label: "Style 11 White" },
            ]
          },
          {
            title: "Flat Rooflights",
            content: "Our flat rooflights are designed with a sleek, edge-to-edge glass exterior that not only looks stunning but offers practical benefits as well. The innovative design ensures water glides effortlessly off the surface, without interference from perimeter sealants or frames.\n\nWith a slim profile standing just 63mm above the roof upstand, these rooflights blend seamlessly into any property, allowing maximum natural light to enter while maintaining a minimalist aesthetic.\n\nBeyond aesthetics, our flat rooflights provide year-round comfort by keeping unwanted heat out and maintaining a consistent ambient room temperature. The high-performance glazing and thermally broken aluminium frame deliver excellent thermal efficiency with a typical U-Value of 1.3 w/m²K, ensuring top-notch energy performance.",
            overviewImage: require('../assets/lanterns/flatroof/flat-roof-main-image.jpg'),
            overviewImageMode: 'cover'
          }
        ],
        colours: [
          {
            title: "Colour Options",
            content: "Choose from classic shades like black, grey, and white, or customize with any RAL colour to match your unique aesthetic preferences seamlessly.",
            swatches: [
              { image: require('../assets/lanterns/colours/WHITE.png'), label: "White" },
              { image: require('../assets/lanterns/colours/BLACK.png'), label: "Black" },
              { image: require('../assets/lanterns/colours/GREY.png'), label: "Grey" }
            ]
          }
        ],
        galleryAlbumName: "Aluminium Lanterns & Flat Rooflights"
      },
      {
        id: "skyrooms-sub",
        title: "Skyrooms",
        image: require('../assets/skyroom-category-image.jpg'),
        cardImage: require('../assets/living-spaces/skyrooms/card-image.png'),
        tagline: "Ample headroom and unobstructed views of the sky above.",
        heroImage: require('../assets/living-spaces/skyrooms/card-image.png'),
        about: "The Skyroom mirrors the sleek appearance of a contemporary ultra-slim orangery lantern, both inside and out. It features no visible low tie bars or bulky joint covers, ensuring ample headroom and unobstructed views of the sky above.\n\nWith a 70% slimmer ridge and 30% slimmer rafter, our Skyroom combines aesthetic design, exceptional strength, and unmatched thermal performance. This results in a distinctive product that stands out in the market for its unique look and superior features.",
        stats: {
          rating: "4.9",
          reviews: "185",
          completed: "400+"
        },
        priceLabel: "Price on Request",
        subcategories: [],
        details: [
          {
            title: "The Benefits",
            content: "Experience the Bradley Scott Windows Skyroom, featuring a fully thermally broken aluminium roof system that ensures exceptional thermal efficiency. Its minimalist, modern design boasts sharp sightlines and ultra-low external profiles, eliminating bulky hood covers for a sleek appearance. Solar control black film conceals the internal pelmet, while hidden tie bars and box tie bars maintain a clean aesthetic.\n\nThe Skyroom requires no structural steel or timber roof beams, utilizing a reinforced ring-beam for bi-folding doors. Its contemporary mock orangery look is enhanced with a choice of bevelled or flat external caps.",
            overviewImage: require('../assets/skyrooms/image1.png'),
            overviewImageMode: 'cover'
          },
          {
            title: "Less is More",
            content: "Unlike conventional roofs, a Skyroom from Bradley Scott Windows features no unsightly rod tie bars or low supports cluttering the roof.\n\nThese supports ensure excellent headroom and minimal intrusion into the space, even in larger rooms. Additionally, the technology eliminates the need for bulky boss or hoods that overpower the ridge, offering more sky and less roof.\n\nThe unique design of our system uses slim and elegant roof materials. Compared to traditional roofs, our internal ridge width is 70% slimmer, and the overall roof structure is up to 33% stronger.",
            overviewImage: require('../assets/skyrooms/image2.png'),
            overviewImageMode: 'cover'
          }
        ],
        glass: [
          {
            title: "Glass Options",
            content: "Our Skyroom glass options not only enhance your home's aesthetics but also offer self-cleaning technology for effortless maintenance. Choose from a wide range of tints, including neutral and blue to create a sleek and modern look that complements your property's style.",
            images: [
              { image: require('../assets/skyrooms/glass options/Neutral-glass.jpg'), label: "Self-Clean Neutral", resizeMode: "cover", fullHeight: true },
              { image: require('../assets/skyrooms/glass options/active-blue.jpg'), label: "Self-Clean Active Blue", resizeMode: "cover", fullHeight: true }
            ]
          }
        ],
        colours: [
          {
            title: "Colour Options",
            content: "Bradley Scott Windows offers a range of versatile designs for Skyrooms, including contemporary options, ensuring they are perfect for modern living spaces. The innovative contemporary design supports the ridge with hip rafters for a truly minimalist and ultra-slim aesthetic.\n\nCustomize your Skyroom with a variety of colour finishes, including classic black, grey, and white, or choose any RAL colour to perfectly match your style and home."
          },
          {
            title: "Standard Colours",
            content: "Our standard colour range is available with short lead times.",
            swatches: [
              { image: require('../assets/windows/aluminium-windows/colours/standard/WHITE-9016.png'), label: "White 9016" },
              { image: require('../assets/windows/aluminium-windows/colours/standard/BLACK-9005.png'), label: "Black 9005" },
              { image: require('../assets/windows/aluminium-windows/colours/standard/GREY-7016.png'), label: "Grey 7016" }
            ]
          }
        ],
        extras: [],
        galleryAlbumName: "Skyrooms"
      },
      {
        id: "tiled-roofs",
        title: "Tiled Roofs",
        cardImage: require('../assets/living-spaces/tiled-roof/card-image.jpg'),
        tagline: "Discover award-winning tiled roofs.",
        heroImage: require('../assets/living-spaces/tiled-roof/main-image.jpg'),
        about: "Our solid tiled roofs offer a classic, durable solution for extending your living space. Designed to provide superior insulation and energy efficiency, these roofs blend seamlessly with your home’s existing architecture. They combine the traditional appearance of tiled roofing with modern performance, ensuring a stylish and comfortable space that enhances both the look and functionality of your home.",
        stats: {
          rating: "4.9",
          reviews: "320",
          completed: "800+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Envirotile",
            content: "Discover our flat, precision-manufactured Envirotile—a lightweight roof tile made from recycled polymer, boasting excellent environmental credentials. Easy to install, it securely locks into adjacent tiles, creating a seamless roof covering. Envirotile is remarkably durable, 80% lighter than concrete tiles, and requires minimal upkeep. Crafted in the UK and backed by a comprehensive 25-year warranty for peace of mind."
          },
          {
            title: "Tapco",
            content: "TapcoSlate tiles replicate the authentic look of natural slate with textured surfaces and riven edges, moulded from a recyclable blend of limestone and polypropylene. These tiles are engineered for exceptional durability, resisting cracking, breaking, and delamination over time. TapcoSlate tiles are available in 5 standard colours and 9 alternative colours, backed by a reassuring 40-year warranty."
          },
          {
            title: "Britmet",
            content: "Britmet’s Liteslate is an innovative synthetic roofing tile crafted from 90% recycled polymers, offering all the characteristics of traditional slate tiles. Features an authentic finish with riven edges and exceptional durability. Available in 7 colour finishes, Liteslate comes with a 40-year guarantee against weather penetration."
          },
          {
            title: "Glass Upgrade",
            content: "Introducing our award-winning Hybrid Tiled Roof, a luxurious solid conservatory roof designed to provide exceptional light and thermal efficiency. With elegant glass panels, you can enjoy panoramic views and abundant natural light, enhancing your living space with both style and functionality.",
            overviewImage: require('../assets/living-spaces/tiled-roof/glass-uprade-image.jpg'),
            overviewImageMode: 'cover'
          }
        ],
        colours: [
          {
            title: "Envirotile Colours",
            content: "Envirotile comes in Anthracite Black, Slate Grey, and Dark Brown.",
            swatches: [
              { image: require('../assets/living-spaces/tiled-roof/tile-types/envirotile/ANTHRACITE-BLACK.png'), label: "Anthracite Black" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/envirotile/DARK-BROWN.png'), label: "Dark Brown" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/envirotile/SLATE-GREY.png'), label: "Slate Grey" }
            ]
          },
          {
            title: "Tapco Colours",
            content: "Tapco options include Stone Black, Pewter Grey, Plum, Chestnut Brown, and Brick Red.",
            swatches: [
              { image: require('../assets/living-spaces/tiled-roof/tile-types/tapco/STONE-BLACK.png'), label: "Stone Black" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/tapco/PEWTER-GREY.png'), label: "Pewter Grey" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/tapco/PLUM.png'), label: "Plum" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/tapco/CHESNUT-BROWN.png'), label: "Chestnut Brown" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/tapco/BRICK-RED.png'), label: "Brick Red" }
            ]
          },
          {
            title: "Britmet Colours",
            content: "Britmet’s Liteslate is available in Charcoal, Ash, Slate Grey, Amethyst, Oak, Sunshine, and Sunset.",
            swatches: [
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/CHARCOAL.png'), label: "Charcoal" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/ASH.png'), label: "Ash" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/SLATE-GREY-1.png'), label: "Slate Grey" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/AMETHYST.png'), label: "Amethyst" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/OAK.png'), label: "Oak" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/SUNSHINE.png'), label: "Sunshine" },
              { image: require('../assets/living-spaces/tiled-roof/tile-types/britmet/SUNSET.png'), label: "Sunset" }
            ]
          }
        ],
        extras: [],
        galleryAlbumName: "Warm/Tiled Roof"
      }
    ]
  },
  {
    id: "bi-fold-doors",
    title: "Bi-Fold Doors",
    image: require('../assets/bi-fold-doors-category-image.png'),
    cardImage: require('../assets/bi-fold-doors-category-image.png'),
    tagline: "Aluminium Bi-fold doors",
    heroImage: require('../assets/doors/bi-fold-doors/main-image.jpg'),
    about: "Available in various configurations with up to 6 door panels, you can choose a design where all panels stack to one side or split them to stack in both directions.\n\nYou also have the option to select whether the doors open inwards or outwards. For added convenience, designs featuring a single traffic door allow easy access to your garden without needing to move the other panels.\n\nEnjoy super slim frames for enhanced natural light and neatly folding doors for a fully maximized opening.",
    stats: {
      rating: "4.9",
      reviews: "699",
      completed: "1,200+"
    },
    priceLabel: "Price on Request",
    subcategories: [],
    details: [
      {
        title: "Door Configurations & Features",
        content: "Available in various configurations with up to 6 door panels, you can choose a design where all panels stack to one side or split them to stack in both directions.\n\nFeatures:\n\u2022 Super Slim frames for enhanced natural light\n\u2022 Neatly folding doors for a fully maximized opening\n\u2022 Built to meet British and European security standards\n\u2022 Standard 6-point locking system (optional hook lock: 2 hooks, 1 deadbolt, 1 latch)\n\u2022 Choose between inward or outward opening\n\u2022 Water-resistant up to 600 Pa\n\u2022 Configurable with up to 6 door panels\n\u2022 Maximum height of 2412 mm\n\u2022 Door panel widths up to 1200 mm",
        images: []
      },
      {
        title: "Styles",
        content: "We offer a variety of styles to perfectly match your home's aesthetic.",
        overviewImage: require('../assets/doors/bi-fold-doors/styles/styles-image.png'),
        overviewImageMode: 'contain'
      },
      {
        title: "Threshold Options",
        content: "Four threshold options to suit your needs, providing optimal weather resistance and easy access.",
        overviewImage: require('../assets/doors/bi-fold-doors/styles/threshold-types/Level-1.png'),
        overviewImageMode: 'contain'
      },
      {
        title: "Standard Handles",
        content: "Choose from a range of premium handle finishes to complement your bi-fold doors.",
        images: [
          { image: require('../assets/doors/bi-fold-doors/hardware/white_door_handle.jpg'), label: "White" },
          { image: require('../assets/doors/bi-fold-doors/hardware/black_handles.jpg'), label: "Black" },
          { image: require('../assets/doors/bi-fold-doors/hardware/Anthracit_-Grey.jpg'), label: "Anthracite Grey" },
          { image: require('../assets/doors/bi-fold-doors/hardware/Polished_Chrome.jpg'), label: "Polished Chrome" },
          { image: require('../assets/doors/bi-fold-doors/hardware/Satin_Chrome.jpg'), label: "Satin Chrome" },
          { image: require('../assets/doors/bi-fold-doors/hardware/graphite.jpg'), label: "Graphite" },
        ]
      }
    ],
    colours: [
      {
        title: "Standard Colours",
        content: "Our standard colour range is available with short lead times.",
        swatches: [
          { image: require('../assets/windows/aluminium-windows/colours/standard/WHITE-9016.png'), label: "White 9016" },
          { image: require('../assets/windows/aluminium-windows/colours/standard/BLACK-9005.png'), label: "Black 9005" },
          { image: require('../assets/windows/aluminium-windows/colours/standard/GREY-7016.png'), label: "Grey 7016" }
        ]
      },
      {
        title: "Extended Lead Time",
        content: "These colours are available with an extended lead time.",
        swatches: [
          { image: require('../assets/windows/aluminium-windows/colours/extended/AGATE-GREY-EXTERNAL-WHITE-INTERNAL-qznye980s7mkkzzck0r4wvjt5ym2kyh7gxoq67s4iw.png'), label: "Agate Grey / White" },
          { image: require('../assets/windows/aluminium-windows/colours/extended/BLACK-EXTERNAL-WHITE-INTERNAL-qznye980s7mkkzzck0r4wvjt5ym2kyh7gxoq67s4iw.png'), label: "Black / White" },
          { image: require('../assets/windows/aluminium-windows/colours/extended/FRENCH-GREY-EXTERNAL-WHITE-INTERNAL-qznyea5uz1nuwlxzej5rhdb9rchfsnkxt2c7nhqqco.png'), label: "French Grey / White" },
          { image: require('../assets/windows/aluminium-windows/colours/extended/GREY-EXTERNAL-WHITE-INTERNAL-qznyea5uz1nuwlxzej5rhdb9rchfsnkxt2c7nhqqco.png'), label: "Grey / White" }
        ]
      }
    ],
    galleryAlbumName: "Aluminium Bi-fold Doors"
  },
  {
    id: "skyrooms",
    title: "Skyrooms",
    image: require('../assets/skyroom-category-image.jpg'),
    cardImage: require('../assets/skyroom-category-image.jpg'),
    tagline: "Ample headroom and unobstructed views of the sky above.",
    heroImage: require('../assets/skyrooms/main-image.png'),
    about: "The Skyroom mirrors the sleek appearance of a contemporary ultra-slim orangery lantern, both inside and out. It features no visible low tie bars or bulky joint covers, ensuring ample headroom and unobstructed views of the sky above.\n\nWith a 70% slimmer ridge and 30% slimmer rafter, our Skyroom combines aesthetic design, exceptional strength, and unmatched thermal performance. This results in a distinctive product that stands out in the market for its unique look and superior features.",
    stats: {
      rating: "4.9",
      reviews: "185",
      completed: "400+"
    },
    priceLabel: "Price on Request",
    subcategories: [],
    details: [
      {
        title: "The Benefits",
        content: "Experience the Bradley Scott Windows Skyroom, featuring a fully thermally broken aluminium roof system that ensures exceptional thermal efficiency. Its minimalist, modern design boasts sharp sightlines and ultra-low external profiles, eliminating bulky hood covers for a sleek appearance. Solar control black film conceals the internal pelmet, while hidden tie bars and box tie bars maintain a clean aesthetic.\n\nThe Skyroom requires no structural steel or timber roof beams, utilizing a reinforced ring-beam for bi-folding doors. Its contemporary mock orangery look is enhanced with a choice of bevelled or flat external caps.",
        overviewImage: require('../assets/skyrooms/image1.png'),
        overviewImageMode: 'cover'
      },
      {
        title: "Less is More",
        content: "Unlike conventional roofs, a Skyroom from Bradley Scott Windows features no unsightly rod tie bars or low supports cluttering the roof.\n\nThese supports ensure excellent headroom and minimal intrusion into the space, even in larger rooms. Additionally, the technology eliminates the need for bulky boss or hoods that overpower the ridge, offering more sky and less roof.\n\nThe unique design of our system uses slim and elegant roof materials. Compared to traditional roofs, our internal ridge width is 70% slimmer, and the overall roof structure is up to 33% stronger.",
        overviewImage: require('../assets/skyrooms/image2.png'),
        overviewImageMode: 'cover'
      }
    ],
    glass: [
      {
        title: "Glass Options",
        content: "Our Skyroom glass options not only enhance your home's aesthetics but also offer self-cleaning technology for effortless maintenance. Choose from a wide range of tints, including neutral and blue to create a sleek and modern look that complements your property's style.",
        images: [
          { image: require('../assets/skyrooms/glass options/Neutral-glass.jpg'), label: "Self-Clean Neutral", resizeMode: "cover", fullHeight: true },
          { image: require('../assets/skyrooms/glass options/active-blue.jpg'), label: "Self-Clean Active Blue", resizeMode: "cover", fullHeight: true }
        ]
      }
    ],
    colours: [
      {
        title: "Colour Options",
        content: "Bradley Scott Windows offers a range of versatile designs for Skyrooms, including contemporary options, ensuring they are perfect for modern living spaces. The innovative contemporary design supports the ridge with hip rafters for a truly minimalist and ultra-slim aesthetic.\n\nCustomize your Skyroom with a variety of colour finishes, including classic black, grey, and white, or choose any RAL colour to perfectly match your style and home."
      },
      {
        title: "Standard Colours",
        content: "Our standard colour range is available with short lead times.",
        swatches: [
          { image: require('../assets/windows/aluminium-windows/colours/standard/WHITE-9016.png'), label: "White 9016" },
          { image: require('../assets/windows/aluminium-windows/colours/standard/BLACK-9005.png'), label: "Black 9005" },
          { image: require('../assets/windows/aluminium-windows/colours/standard/GREY-7016.png'), label: "Grey 7016" }
        ]
      }
    ],
    extras: [],
    galleryAlbumName: "Skyrooms"
  }
];
