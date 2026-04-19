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
    id: "doors",
    title: "Doors",
    image: require('../assets/composite-doors-category-image.png'),
    subcategories: [
      {
        id: "upvc-doors",
        title: "uPVC Doors",
        cardImage: require('../assets/doors/upvc-doors/category-card-image.png'),
        tagline: "Bespoke uPVC doors, tailored for style and safety.",
        heroImage: require('../assets/doors/upvc-doors/main-image.png'),
        about: "Discover a wide array of uPVC doors at Bradley Scott Windows, tailored to suit your unique style and preferences. Our doors come in a variety of frame and door styles, colours, finishes, and glazing options, all customisable to meet your exact requirements.\n\nOur Ultimate Bespoke Doors feature a slimline midrail as standard, ensuring consistent sight lines and proportions across different styles. For those seeking a traditional timber door aesthetic, we offer the Deep Featured Midrail option, closely resembling classic timber door designs and enhancing the overall appearance.",
        stats: {
          rating: "4.9",
          reviews: "699",
          completed: "1,200+"
        },
        priceLabel: "Price on Request",
        details: [
          {
            title: "Frame Styles",
            content: "Your initial choice revolves around selecting the door profile: either bevelled or ovolo. This decision is typically guided by the property's architectural style or personal taste preferences.\n\nBevelled: The bevelled profile, sometimes referred to as chamfered, offers a crisp aesthetic where the frame meets the glass at an angled straight edge.\n\nOvolo: The ovolo, or sculptured profile, is a favoured option for doors in period-style homes, characterised by curved shapes and softer sightlines.",
            images: [
              { image: require('../assets/windows/casement-windows/styles/bevelled-image.jpg'), label: "Bevelled" },
              { image: require('../assets/windows/casement-windows/styles/ovolo-image.jpg'), label: "Ovolo" },
            ]
          },
          {
            title: "Security Features",
            content: "A total of 14 security points around each door, including:\n\u2022 Shoot Bolts\n\u2022 Hook Locks\n\u2022 Dead Locks\n\u2022 Centre Latch\n\u2022 Compression Roller Cams\n\u2022 Anti-jemmy Hinge Bolts\n\u2022 Standard Hinge (Multiple Finishes)\n\u2022 Heritage Only Pencil Hinge",
            overviewImage: require('../assets/doors/upvc-doors/security-images/DOOR-FULL-IMAGE.png'),
            images: [
              { image: require('../assets/doors/upvc-doors/security-images/A-1.png'), label: "Shoot Bolts" },
              { image: require('../assets/doors/upvc-doors/security-images/B-1.png'), label: "Hook Locks" },
              { image: require('../assets/doors/upvc-doors/security-images/C-1.png'), label: "Dead Locks" },
              { image: require('../assets/doors/upvc-doors/security-images/D-1.png'), label: "Centre Latch" },
              { image: require('../assets/doors/upvc-doors/security-images/E.png'), label: "Compression Roller Cams" },
              { image: require('../assets/doors/upvc-doors/security-images/F.png'), label: "Anti-jemmy Hinge Bolts" },
              { image: require('../assets/doors/upvc-doors/security-images/G.png'), label: "Standard Hinge" },
            ]
          }
        ],
        styles: [
          {
            title: "uPVC Door Designs",
            content: "Our Ultimate Bespoke door collection offers a wide range of panel designs to suit any property style, from contemporary to traditional.",
            images: [
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/ASSINGTON.png'), label: "Assington" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/BELCHAMP.png'), label: "Belchamp" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/BOXFORD.png'), label: "Boxford" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/BRETT.png'), label: "Brett" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/BURES.png'), label: "Bures" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/CAVENDISH.png'), label: "Cavendish" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/COLNE.png'), label: "Colne" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/CORNARD.png'), label: "Cornard" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/DEPDEN.png'), label: "Depden" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/GOSFIELD.png'), label: "Gosfield" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/HADLEIGH.png'), label: "Hadleigh" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/HARTEST.png'), label: "Hartest" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/HEDINGHAM.png'), label: "Hedingham" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/IKSOWRTH.png'), label: "Ixworth" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/IXWORTH-2.png'), label: "Ixworth 2" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/KERSEY.png'), label: "Kersey" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/LAVENHAM.png'), label: "Lavenham" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/MELFORD.png'), label: "Melford" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/NAYLAND.png'), label: "Nayland" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/NEWTON.png'), label: "Newton" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/PEBMARSH.png'), label: "Pebmarsh" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/POLSTEAD.png'), label: "Polstead" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/STOUR.png'), label: "Stour" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/SUDBURY.png'), label: "Sudbury" },
              { image: require('../assets/doors/upvc-doors/pvc-door-styles/YELDHAM.png'), label: "Yeldham" },
            ]
          }
        ],
        hardware: [
          {
            title: "Door Handles",
            content: "When it comes to choosing handles for your doors, we offer a wide range of styles, colours, and finishes to perfectly complement your home's aesthetic. Whether you prefer sleek modern designs or traditional finishes, our selection ensures you'll find the perfect match.",
            images: [
              { image: require('../assets/doors/upvc-doors/hardware/handles/white.png'), label: "White" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/BLACK.png'), label: "Black" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/GRAPHITE.png'), label: "Graphite" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/GOLD.png'), label: "Gold" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/CHROME.png'), label: "Chrome" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/SATIN.png'), label: "Satin" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/BRONZE.png'), label: "Bronze" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/PEWTER.png'), label: "Pewter" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/ROSE-GOLD.png'), label: "Rose Gold" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/SWAN-NECK.png'), label: "Swan Neck" },
              { image: require('../assets/doors/upvc-doors/hardware/handles/PAD-HANDLE.png'), label: "Pad Handle" },
            ]
          },
          {
            title: "Door Knockers",
            content: "Complete the look of your door with our range of knocker styles and finishes.",
            images: [
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Black-knocker.png'), label: "Black" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Graphite-knocker.png'), label: "Graphite" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Gold-knocker.png'), label: "Gold" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Chrome-knocker.png'), label: "Chrome" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Bronze-knocker.png'), label: "Bronze" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Pewter-knocker.png'), label: "Pewter" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Antique-Black-knocker.png'), label: "Antique Black" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Rose-Gold-knocker.png'), label: "Rose Gold" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Forged-Black-knocker.png'), label: "Forged Black" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Urn-and-Slim-Urn-Knocker.png'), label: "Urn Styles" },
              { image: require('../assets/doors/upvc-doors/hardware/knockers/Spire-Knocker-knocker.png'), label: "Spire Knocker" },
            ]
          },
          {
            title: "Letterboxes",
            content: "Choose from a selection of letterbox finishes to match your door hardware.",
            images: [
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/WHITE-LETTERBOX.png'), label: "White" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/BLACK-LLETERBOX.png'), label: "Black" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/GRAPHITE-LLETERBOX.png'), label: "Graphite" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/GOLD-LLETERBOX.png'), label: "Gold" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/CHROME-LLETERBOX.png'), label: "Chrome" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/SATIN-LLETERBOX.png'), label: "Satin" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/BRONZE-LLETERBOX.png'), label: "Bronze" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/PEWTER-LLETERBOX.png'), label: "Pewter" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/ANTIQUE-BLACK-LLETERBOX.png'), label: "Antique Black" },
              { image: require('../assets/doors/upvc-doors/hardware/letterboxes/ROSE-GOLD-LLETERBOX.png'), label: "Rose Gold" },
            ]
          }
        ],
        colours: [
          {
            title: "Standard Colours",
            content: "Whatever style and finish you desire for your doors, the Ultimate Collection provides a wide selection to meet your needs. Our standard colour range is available with short lead times.",
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
            content: "Special order colours for unique projects. Please note that not all colours are available in every profile type or product range.",
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
            title: "Optional Deep Midrail",
            content: "Our Ultimate Bespoke Doors feature a standard slimline midrail that ensures consistent sight lines and proportions across all styles. For those seeking a more traditional look reminiscent of timber doors, select styles in our collection offer the new Deep Featured Midrail option. This deeper midrail closely mirrors the appearance of classic timber door designs.\n\nAdditionally, our Ultimate Bespoke doors provide flexibility with midrail options, including the 3-section 168mm Midrail or the 1-section Deep Timber Look 195mm Midrail."
          },
          {
            title: "Timber Look Joints",
            content: "Achieve an authentic timber appearance with Ultimate Heritage doors, featuring the option of Genus timber-look joints. These joints replicate traditional butt joints found on timber doors, providing an alternative to 45° welded joints."
          },
          {
            title: "Optional Deep Timber Look Cill",
            content: "Enhance the timber aesthetic with Ultimate Bespoke Doors, offering the choice of a deeper, timber-look PVC-u cill. This option completes the traditional timber look with proportions deeper than standard PVC-u cills."
          },
          {
            title: "Glazing Options",
            content: "Our door range offers flexible glazing options that allow you to create a new, contemporary look or preserve a classic, authentic style. Options include plain glass, obscured glass, coloured glass, etched glass, leaded designs, and bevelled designs, each with numerous variations to suit the style of your project."
          },
          {
            title: "Authentic Astragal Georgian Bar",
            content: "Our authentic astragal clip-on Georgian Bar design instantly creates a period look. The bars are fixed to full-length aluminium backing strips, ensuring they remain straight and true over time.",
            image: require('../assets/windows/EXTRAS/GEORGIAN-BAR-EXTERNAL.jpg')
          },
          {
            title: "Decorative Glass",
            content: "Coloured and bevelled glass designs offer a traditional appearance, while simpler etched glass designs provide a contemporary feel. The dimensions of these glass patterns can be tailored to suit any door style, with options for half, dual, and full-height glazed panels."
          }
        ],
        galleryAlbumName: "uPVC Single Doors, French Doors & Patio Doors",
        subcategories: []
      },
      {
        id: "composite-doors",
        title: "Composite Doors",
        cardImage: require('../assets/composite-doors-category-image.png'),
        subcategories: [
          {
            id: "edge-collection",
            title: "Edge Collection",
            cardImage: require('../assets/doors/composite-doors/edge/category-image.png'),
            tagline: "Superior thermal performance with Bradley Scott Windows' Edge Collection.",
            heroImage: require('../assets/doors/composite-doors/edge/main-image.png'),
            about: "Our Edge Collection doors excel in thermal performance, featuring a high-density, foam insulated core that effectively retains heat within your home, minimizing heat loss through the door.\n\nThey’ve been shown to offer 19% greater thermal efficiency compared to 48mm solid timber core doors and 17% more efficiency than traditional timber doors. With these energy-saving attributes, our Edge Collection doors contribute to lower energy consumption and reduced energy costs for your home.",
            stats: {
              rating: "4.9",
              reviews: "699",
              completed: "1,200+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Unique 4mm GRP Skin",
                content: "Experience enhanced protection and durability with the unique 4mm GRP skin on our Edge Collection doors.",
                images: []
              },
              {
                title: "Energy Efficient",
                content: "Our Edge Collection doors excel in thermal performance, featuring a high-density, foam insulated core designed to retain heat within your home, preventing it from escaping through the door. These advanced doors are proven to be 19% more thermally efficient.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone.",
                images: []
              }
            ],
            styles: [
              {
                title: "Edge Collection Designs",
                content: "Customise your Edge Collection door with a diverse range of options to suit your style and preferences.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/edge/door samples/501.png'), label: "501" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/502A-1.png'), label: "502A-1" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/502A.png'), label: "502A" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/503L.png'), label: "503L" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/503R.png'), label: "503R" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/508A.png'), label: "508A" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/509.png'), label: "509" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/510A.png'), label: "510A" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/512L.png'), label: "512L" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/513R.png'), label: "513R" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/517L.png'), label: "517L" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/518L-GLAZED.png'), label: "518L Glazed" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/518R-GLAZED.png'), label: "518R Glazed" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/521-PURPLE.png'), label: "521 Purple" },
                  { image: require('../assets/doors/composite-doors/edge/door samples/521.png'), label: "521" }
                ]
              }
            ],
            hardware: [
              {
                title: "Door Handles",
                content: "When it comes to choosing handles for your doors, we offer a wide range of styles to perfectly complement your home's aesthetic.",
                images: [
                  { image: require('../assets/doors/composite-doors/edge/hardware/handles/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/handles/square-pull-handle.png'), label: "Square Pull Handle" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/handles/NUKI-HARDWARE-IMAGE.png'), label: "Nuki Hardware Keypad" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Cylinder Pull" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Cylinder Pull" }
                ]
              },
              {
                title: "Door Knockers",
                content: "Complete the look of your door with our range of knocker styles.",
                images: [
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" }
                ]
              },
              {
                title: "Letterplates",
                content: "Choose from a selection of letterplates to match your door hardware.",
                images: [
                  { image: require('../assets/doors/composite-doors/edge/hardware/letterplates/Numail-Letterplate.webp'), label: "NuMail Letterplate" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Numerals",
                content: "Enhance your door with styling numerals.",
                images: [
                  { image: require('../assets/doors/composite-doors/edge/hardware/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/edge/hardware/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Our standard colour range guarantees a sleek, modern finish.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" },
                  { image: require('../assets/doors/composite-doors/edge/colours/standard/white-smooth.png'), label: "White" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "For a more traditional look check out our rustic and wood-effect finishes.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/edge/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your edge collection door.",
                images: [
                  { image: require('../assets/doors/composite-doors/edge/glass options/VETRO-1.png'), label: "Vetro" },
                  { image: require('../assets/doors/composite-doors/edge/glass options/ETCH-LINES.png'), label: "Etch Lines" },
                  { image: require('../assets/doors/composite-doors/edge/glass options/DIFUSO.png'), label: "Difuso" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "gemstone-collection",
            title: "Gemstone Collection",
            cardImage: require('../assets/doors/composite-doors/gemstone/category-image.png'),
            tagline: "Enhance Your Entrance with Premium Wood Effect Composite Doors",
            heroImage: require('../assets/doors/composite-doors/gemstone/main-image.png'),
            about: "Elevate the curb appeal of your home and create a lasting impression with our exquisite Gemstone Collection.\n\nThese wood effect front doors offer an elegant and authentic appearance that enhances any property’s entrance. Featuring a natural timber look, a wide range of colours, and bevelled and etched glass designs, these doors are crafted to impress.\n\nNot only do they add a touch of class to your home, but our Gemstone Collection doors are also highly energy efficient. With low maintenance requirements and a 10-year guarantee, you can enjoy peace of mind knowing that your door will endure over time.",
            stats: {
              rating: "5.0",
              reviews: "1.2k",
              completed: "2000+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Authentic Appearance",
                content: "Wood effect composite doors that offer an elegant and authentic appearance, enhancing any property's entrance.",
                images: []
              },
              {
                title: "Highly Secure",
                content: "Our Gemstone collection incorporates toughened or laminated glass to enhance strength and security. Our doors exceed PAS24 testing requirements, ensuring your home is well-protected against unwanted visitors.",
                images: []
              },
              {
                title: "Energy Efficient",
                content: "Highly energy efficient with a 10-year guarantee. Enjoy peace of mind knowing that your door will endure over time with minimal maintenance required.",
                images: []
              }
            ],
            styles: [
              {
                title: "Gemstone Collection Designs",
                content: "Customise your Gemstone Collection door with a diverse range of options, from Coral Arches to Sapphire designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/CORAL-ARCH.png'), label: "Coral Arch" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/CRYSTAL-1-LITE.png'), label: "Crystal 1 Lite" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/CRYSTAL-2.png'), label: "Crystal 2" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/CRYSTAL-3.png'), label: "Crystal 3" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/CRYSTAL.png'), label: "Crystal" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/NEW-HAMPSHIRE.png'), label: "New Hampshire" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/OPAL-1.png'), label: "Opal 1" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/PEARL-1-ARCH.png'), label: "Pearl 1 Arch" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/QUARTZ.png'), label: "Quartz" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/SAPPHIRE.png'), label: "Sapphire" },
                  { image: require('../assets/doors/composite-doors/gemstone/door-styles/TOPAZ.png'), label: "Topaz" }
                ]
              }
            ],
            hardware: [
              {
                title: "Door Handles",
                content: "When it comes to choosing handles for your doors, we offer a wide range of styles to perfectly complement your home's aesthetic.",
                images: [
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/BALMORAL-LEVER-HANDLE.png'), label: "Balmoral Lever" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/BALMORAL-PAD-HANDLE.png'), label: "Balmoral Pad" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/HERITAGE-LEVER-HANDLE.png'), label: "Heritage Lever" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/NUKI-HARDWARE-IMAGE.png'), label: "Nuki Keypad" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/SWEET-LEVER-HANDLE.png'), label: "Sweet Lever" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/SWEET-LOCK-LOCK-HANDLE.png'), label: "Sweet Lock" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/SWEET-SMART-LOCK-HANDLE-1.png'), label: "Sweet Smart Lock" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Pull" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Pull" }
                ]
              },
              {
                title: "Door Knockers",
                content: "Complete the look of your door with our range of knocker styles.",
                images: [
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" }
                ]
              },
              {
                title: "Letterplates",
                content: "Choose from a selection of letterplates to match your door hardware.",
                images: [
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/letterplates/Numail-Letterplate.webp'), label: "NuMail Letterplate" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Numerals",
                content: "Enhance your door with styling numerals.",
                images: [
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/gemstone/hardware/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Our standard colour range guarantees a sleek, modern finish.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/standard/white-smooth.png'), label: "White" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "For a more traditional look check out our rustic and wood-effect finishes.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/gemstone/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Gemstone collection door.",
                images: [
                  { image: require('../assets/doors/composite-doors/gemstone/glass/CRYSTAL-FLOWERS.png'), label: "Crystal Flowers" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/DIAMOND-CUT.png'), label: "Diamond Cut" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/DORCHESTER.png'), label: "Dorchester" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/FLAIR.png'), label: "Flair" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/GREENFIELD.png'), label: "Greenfield" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/HOLBORN.png'), label: "Holborn" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/LEAD-LINES.png'), label: "Lead Lines" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/MAMARA.png'), label: "Mamara" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/MONTANA.png'), label: "Montana" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/NEW-ORLEANS-ROSE-GOLD.png'), label: "New Orleans" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/PARIS.png'), label: "Paris" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/PRAIRIE.png'), label: "Prairie" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/SIMPLICITY-BRASS.png'), label: "Simplicity" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/TOPAZ-1.png'), label: "Topaz 1" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/VICTORIAN-BORDER.png'), label: "Victorian Border" },
                  { image: require('../assets/doors/composite-doors/gemstone/glass/ZINC-ART-STAR.png'), label: "Zinc Art Star" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "galaxy-collection",
            title: "Galaxy Collection",
            cardImage: require('../assets/doors/composite-doors/galaxy/category-card-image.png'),
            tagline: "Enhance your home with timeless style.",
            heroImage: require('../assets/doors/composite-doors/galaxy/main-image.png'),
            about: "Step into a realm of enduring elegance with the Galaxy Collection from Bradley Scott Windows. Our cottage-style composite front doors are intricately designed to impart a softer contemporary aesthetic to your home. Featuring sculptured glazing cassettes combined with flush and cottage door slabs, these doors effortlessly blend style with practicality. Explore a diverse selection of door styles, colours, glass designs, and hardware options to craft a bespoke entrance that mirrors your individual style.",
            stats: {
              rating: "4.9",
              reviews: "450",
              completed: "800+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Your Dream Door Awaits",
                content: "Discover the versatility of our Galaxy Collection, offering a myriad of customisation options to ensure your new composite door aligns perfectly with your unique style and preferences. From an extensive palette of colours to a diverse selection of glass designs and hardware finishes, you have the flexibility to tailor every detail of your door. Whether you lean towards a timeless, classic aesthetic or a sleek, modern design, the Galaxy Collection from Bradley Scott Windows is crafted to suit your individual tastes.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Galaxy Collection Designs",
                content: "Customize your Galaxy Collection door with a variety of out-of-this-world designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/APOLLO-2.png'), label: "Apollo 2" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/APOLLO-3_4.png'), label: "Apollo 3/4" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/APOLLO.png'), label: "Apollo" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/LUNA-2L.png'), label: "Luna 2L" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/MARS.png'), label: "Mars" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/NEPTUNE-4.png'), label: "Neptune 4" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/PLUTO-1L.png'), label: "Pluto 1L" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/SATURN-3-R.png'), label: "Saturn 3R" },
                  { image: require('../assets/doors/composite-doors/galaxy/door-styles/STELLAR.png'), label: "Stellar" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles.",
                images: [
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/handles/NUKI-HARDWARE-IMAGE.png'), label: "Nuki Hardware" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/handles/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/handles/square-pull-handle.png'), label: "Square Pull Handle" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Cylinder Pull" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Cylinder Pull" }
                ]
              },
              {
                title: "Knockers",
                content: "Add the perfect finishing touch with our stylish door knockers.",
                images: [
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" }
                ]
              },
              {
                title: "Letterplates",
                content: "Complete your door with a matching letterplate.",
                images: [
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/letterplates/Numail-Letterplate.webp'), label: "Numail Letterplate" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Extras",
                content: "Numerals and other finishing touches.",
                images: [
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/galaxy/hardware/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Choose from our range of standard solid colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/white-smooth.png'), label: "White" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "Choose from our beautiful selection of rustic woodgrain colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/galaxy/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Galaxy collection door.",
                images: [
                  { image: require('../assets/doors/composite-doors/galaxy/glass/AURORA.png'), label: "Aurora" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/CRYSTAL-FLOWERS.png'), label: "Crystal Flowers" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/FINESSE.png'), label: "Finesse" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/GREENWICH.png'), label: "Greenwich" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/KENSINGTON.png'), label: "Kensington" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/LINEAR.png'), label: "Linear" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/NEW-ORLEANS-BLACK.png'), label: "New Orleans Black" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/NEW-ORLEANS-ROSE-GOLD.png'), label: "New Orleans Rose Gold" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/NUMBERS.png'), label: "Numbers" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/REFLECTIONS.png'), label: "Reflections" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/RICHMONDZINC.png'), label: "Richmond Zinc" },
                  { image: require('../assets/doors/composite-doors/galaxy/glass/TAHOE-1.png'), label: "Tahoe 1" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "highline-range",
            title: "Highline Range",
            cardImage: require('../assets/doors/composite-doors/highline/highline-category-image.png'),
            tagline: "Enhance your home with style and durability.",
            heroImage: require('../assets/doors/composite-doors/highline/main-image.png'),
            about: "The Highline range showcases a sleek steel glazing appearance paired with a flush-fit aluminium exterior, delivering a modern aesthetic that elevates any property’s curb appeal. Available in classic black, anthracite, and white, with a variety of glass options, the Highline range offers abundant customization possibilities for homeowners.",
            stats: {
              rating: "4.9",
              reviews: "320",
              completed: "500+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "High Performance",
                content: "Add a modern touch to your home with the Highline Range of composite front doors from Entrance Composite Door Solutions. These doors are not only look sleek and modern, but they are also secure and energy-efficient, making them a great addition to any property.",
                images: []
              },
              {
                title: "Energy & Insulation",
                content: "Beyond its stylish appearance, the Highline range prioritizes durability. Crafted from a blend of thermally broken aluminium and uPVC, these doors ensure exceptional insulation, contributing to reduced energy consumption and lower utility bills over time.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Highline Door Styles",
                content: "Customize your Highline door with these stylish designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/highline/door-styles/FIVELITE.png'), label: "Five Lite" },
                  { image: require('../assets/doors/composite-doors/highline/door-styles/FOURLITE.png'), label: "Four Lite" },
                  { image: require('../assets/doors/composite-doors/highline/door-styles/NINEGRID.png'), label: "Nine Grid" },
                  { image: require('../assets/doors/composite-doors/highline/door-styles/SIXGRID.png'), label: "Six Grid" },
                  { image: require('../assets/doors/composite-doors/highline/door-styles/SIXLITE.png'), label: "Six Lite" },
                  { image: require('../assets/doors/composite-doors/highline/door-styles/TRILITE.png'), label: "Tri Lite" }
                ]
              }
            ],
            hardware: [
              {
                title: "Premium Handles",
                content: "Select the perfect handle for your Highline door.",
                images: [
                  { image: require('../assets/doors/composite-doors/highline/hardware/BROOKLYN-LEVER-MATT-BLACK.png'), label: "Brooklyn Lever Matt Black" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/BROOKLYN-LEVER-SATIN-BRASS.png'), label: "Brooklyn Lever Satin Brass" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/BROOKLYN-LEVER-SATIN-STAINLESS-STEEL.png'), label: "Brooklyn Lever Satin Stainless Steel" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/SWEET-HANDLE-BLACK.png'), label: "Sweet Handle Black" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/SWEET-HANDLE-GOLD.png'), label: "Sweet Handle Gold" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/SWEET-HANDLE-POLISHED-CHROME.png'), label: "Sweet Handle Chrome" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/SWEET-HANDLE-SATIN-STAINLESS.png'), label: "Sweet Handle Satin Stainless" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/SWEET-HANDLE-WHITE.png'), label: "Sweet Handle White" },
                  { image: require('../assets/doors/composite-doors/highline/hardware/square-pull-handle.png'), label: "Square Pull Handle" }
                ]
              }
            ],
            colours: [
              {
                title: "Urban Colours",
                content: "Choose from our Highline selection of modern colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/highline/colours/URBAN-BLACK-BOTH-SIDES.png'), label: "Urban Black (Both Sides)" },
                  { image: require('../assets/doors/composite-doors/highline/colours/URBAN-BLACK-URBAN-WHITE.png'), label: "Urban Black / White Inside" },
                  { image: require('../assets/doors/composite-doors/highline/colours/URBAN-GREY-BOTH-SIDES.png'), label: "Urban Grey (Both Sides)" },
                  { image: require('../assets/doors/composite-doors/highline/colours/URBAN-GREY-URBAN-WHITE.png'), label: "Urban Grey / White Inside" },
                  { image: require('../assets/doors/composite-doors/highline/colours/URBAN-WHITE-URBAN-WHITE.png'), label: "Urban White (Both Sides)" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Highline door.",
                images: [
                  { image: require('../assets/doors/composite-doors/highline/glass/highline-clear.png'), label: "Clear Glass" },
                  { image: require('../assets/doors/composite-doors/highline/glass/highline-fluted.png'), label: "Fluted Glass" },
                  { image: require('../assets/doors/composite-doors/highline/glass/highline-kensington.png'), label: "Kensington Glass" },
                  { image: require('../assets/doors/composite-doors/highline/glass/highline-satin.png'), label: "Satin Glass" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "elements-collection",
            title: "Elements Collection",
            cardImage: require('../assets/doors/composite-doors/elements/category-card-image.png'),
            tagline: "Offering style and durability for your home.",
            heroImage: require('../assets/doors/composite-doors/elements/main-image.png'),
            about: "Crafted with precision, our Elements Collection presents homeowners with an extensive array of door styles, colours, glass designs, and hardware options. Whether you lean towards a modern or traditional entrance, we offer doors that cater perfectly to your preferences. Beyond their visual appeal, our doors are fortified with advanced security features, including state-of-the-art locking systems. Moreover, they boast excellent insulation properties, effectively minimizing heat loss and contributing to reduced energy expenditure.",
            stats: {
              rating: "4.9",
              reviews: "450",
              completed: "800+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Security is Paramount",
                content: "Experience peace of mind with the Elements Collection, where security is paramount. Our composite front doors are equipped with toughened or laminated glass for exceptional strength and security. Certified to exceed PAS24 standards, our doors offer robust protection against intruders, ensuring the safety of you and your loved ones.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Elements Door Styles",
                content: "Customize your Elements door with our diverse designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/elements/door-styles/AERGON.png'), label: "Aergon" },
                  { image: require('../assets/doors/composite-doors/elements/door-styles/ARGON-4.png'), label: "Argon 4" },
                  { image: require('../assets/doors/composite-doors/elements/door-styles/CARBON-3C.png'), label: "Carbon 3C" },
                  { image: require('../assets/doors/composite-doors/elements/door-styles/KRYPTON-3L.png'), label: "Krypton 3L" },
                  { image: require('../assets/doors/composite-doors/elements/door-styles/TITANIUM.png'), label: "Titanium" },
                  { image: require('../assets/doors/composite-doors/elements/door-styles/XENON.png'), label: "Xenon" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles.",
                images: [
                  { image: require('../assets/doors/composite-doors/elements/hardware/handles/NUKI-HARDWARE-IMAGE.png'), label: "Nuki Hardware" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/handles/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/handles/square-pull-handle.png'), label: "Square Pull Handle" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Cylinder Pull" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Cylinder Pull" }
                ]
              },
              {
                title: "Knockers",
                content: "Add the perfect finishing touch with our stylish door knockers.",
                images: [
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" }
                ]
              },
              {
                title: "Letterplates",
                content: "Complete your door with a matching letterplate.",
                images: [
                  { image: require('../assets/doors/composite-doors/elements/hardware/letterplates/Numail-Letterplate.webp'), label: "Numail Letterplate" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Extras",
                content: "Numerals and other finishing touches.",
                images: [
                  { image: require('../assets/doors/composite-doors/elements/hardware/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/elements/hardware/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Choose from our range of standard solid colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/white-smooth.png'), label: "White" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/elements/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "Choose from our beautiful selection of rustic woodgrain colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/elements/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Elements collection door.",
                images: [
                  { image: require('../assets/doors/composite-doors/elements/glass/AURORA.png'), label: "Aurora" },
                  { image: require('../assets/doors/composite-doors/elements/glass/CASCATA.png'), label: "Cascata" },
                  { image: require('../assets/doors/composite-doors/elements/glass/ELEMENT.png'), label: "Element" },
                  { image: require('../assets/doors/composite-doors/elements/glass/GREENWICH.png'), label: "Greenwich" },
                  { image: require('../assets/doors/composite-doors/elements/glass/HORIZON.png'), label: "Horizon" },
                  { image: require('../assets/doors/composite-doors/elements/glass/KENSINGTON.png'), label: "Kensington" },
                  { image: require('../assets/doors/composite-doors/elements/glass/LAGUNA.png'), label: "Laguna" },
                  { image: require('../assets/doors/composite-doors/elements/glass/MASTERLINE.png'), label: "Masterline" },
                  { image: require('../assets/doors/composite-doors/elements/glass/MATRIX.png'), label: "Matrix" },
                  { image: require('../assets/doors/composite-doors/elements/glass/MILLENIUM.png'), label: "Millenium" },
                  { image: require('../assets/doors/composite-doors/elements/glass/NEW-ORLEANS-BLACK.png'), label: "New Orleans Black" },
                  { image: require('../assets/doors/composite-doors/elements/glass/NEW-ORLEANS-ROSE-GOLD.png'), label: "New Orleans Rose Gold" },
                  { image: require('../assets/doors/composite-doors/elements/glass/SERENITY.png'), label: "Serenity" },
                  { image: require('../assets/doors/composite-doors/elements/glass/STRAND.png'), label: "Strand" },
                  { image: require('../assets/doors/composite-doors/elements/glass/TAHOE-1.png'), label: "Tahoe 1" },
                  { image: require('../assets/doors/composite-doors/elements/glass/VETRO-1.png'), label: "Vetro 1" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "elegance-collection",
            title: "Elegance Collection",
            cardImage: require('../assets/doors/composite-doors/elegance/category-card-image.png'),
            tagline: "Timeless charm and modern excellence.",
            heroImage: require('../assets/doors/composite-doors/elegance/main-image.png'),
            about: "Discover the perfect blend of timeless charm and contemporary excellence with the Elegance Collection. These doors are designed to seamlessly integrate traditional aesthetics with modern sophistication, creating a captivating focal point for your home’s entrance. Explore our range of versatile glazing options, from expansive glass panes to distinctive focal features, offering ideal customization for your unique home.",
            stats: {
              rating: "4.9",
              reviews: "380",
              completed: "600+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Evoking Style",
                content: "At Bradley Scott Windows, our Elegance Collection doors feature a smooth, sleek finish that is free from any visible graining or mouldings. This minimalist design creates a contemporary yet timeless aesthetic, exuding sophistication and effortless style. These composite doors offer an elegant and stylish entrance, enhancing the overall appeal of any home with their refined appearance.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Elegance Door Styles",
                content: "Explore our sophisticated Elegance door designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ELITE-3-1.png'), label: "Elite 3-1" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ELITE-3-WITH-BAR-HANDLE.png'), label: "Elite 3 With Bar Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ELIXIR-1.png'), label: "Elixir 1" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ETERNAL-1-LONG.png'), label: "Eternal 1 Long" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ETERNAL-DIAMOND-3.png'), label: "Eternal Diamond 3" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ETERNAL-DIAMOND.png'), label: "Eternal Diamond" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/ETERNAL.png'), label: "Eternal" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/EXQUISITE-FRENCH.png'), label: "Exquisite French" },
                  { image: require('../assets/doors/composite-doors/elegance/door-styles/EXQUISITE.png'), label: "Exquisite" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles.",
                images: [
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/BALMORAL-LEVER-HANDLE.png'), label: "Balmoral Lever Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/BALMORAL-PAD-HANDLE.png'), label: "Balmoral Pad Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/HERITAGE-LEVER-HANDLE.png'), label: "Heritage Lever Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/SWEET-LEVER-HANDLE.png'), label: "Sweet Lever Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/SWEET-LOCK-LOCK-HANDLE.png'), label: "Sweet Lock Lock Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/SWEET-SMART-LOCK-HANDLE-1.png'), label: "Sweet Smart Lock Handle 1" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/square-pull-handle.png'), label: "Square Pull Handle" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Cylinder Pull" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Cylinder Pull" }
                ]
              },
              {
                title: "Knockers",
                content: "Add the perfect finishing touch with our stylish door knockers.",
                images: [
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" }
                ]
              },
              {
                title: "Letterplates",
                content: "Complete your door with a matching letterplate.",
                images: [
                  { image: require('../assets/doors/composite-doors/elegance/hardware/letterplates/Numail-Letterplate.webp'), label: "Numail Letterplate" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Extras",
                content: "Numerals and other finishing touches.",
                images: [
                  { image: require('../assets/doors/composite-doors/elegance/hardware/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/elegance/hardware/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Choose from our range of standard solid colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/white-smooth.png'), label: "White" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "Choose from our beautiful selection of rustic woodgrain colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/elegance/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Elegance collection door.",
                images: [
                  { image: require('../assets/doors/composite-doors/elegance/glass/ASPEN.png'), label: "Aspen" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/AURORA.png'), label: "Aurora" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/BULLSEYE.png'), label: "Bullseye" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/CASCATA.png'), label: "Cascata" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/CHELSEA.png'), label: "Chelsea" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/CRYSTAL-FLOWERS.png'), label: "Crystal Flowers" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/ELEMENT.png'), label: "Element" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/GREENWICH.png'), label: "Greenwich" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/HORIZON-1.png'), label: "Horizon 1" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/KENSINGTON.png'), label: "Kensington" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/MASTERLINE.png'), label: "Masterline" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/MODENA.png'), label: "Modena" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/NEW-ORLEANS-BLACK.png'), label: "New Orleans Black" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/NEW-ORLEANS-ROSE-GOLD.png'), label: "New Orleans Rose Gold" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/NUMBERS.png'), label: "Numbers" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/PANACHE.png'), label: "Panache" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/REFLECTIONS.png'), label: "Reflections" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/RICHMONDZINC.png'), label: "Richmond Zinc" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/STRAND.png'), label: "Strand" },
                  { image: require('../assets/doors/composite-doors/elegance/glass/TAHOE-1.png'), label: "Tahoe 1" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "stable-doors",
            title: "Stable Doors",
            cardImage: require('../assets/doors/composite-doors/stable-doors/category-card-image.png'),
            tagline: "Traditional charm with contemporary appeal.",
            heroImage: require('../assets/doors/composite-doors/stable-doors/main-image.png'),
            about: "Stable Doors blend traditional charm with contemporary appeal, making them a popular choice for modern homes. They create a welcoming atmosphere and provide excellent ventilation, perfect for maintaining a cool interior in summer. When winter arrives, their tight seal keeps cold weather out, ensuring warmth and comfort indoors. Stable Doors are loved for their timeless style and practical benefits, catering to the needs of today’s homeowners while honouring tradition.",
            stats: {
              rating: "4.9",
              reviews: "380",
              completed: "600+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Customisable Security",
                content: "At Bradley Scott Windows, you can choose from a wide array of hardware options, such as sturdy locking mechanisms, handles, and bolts, to personalize your door’s security and meet your preferences. Our composite door materials provide inherent strength, combined with these top-quality security features, ensuring a durable and resilient door solution.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Stable Door Styles",
                content: "Explore our diverse range of traditional, half-glazed, and contemporary stable door designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/DUAL-GLAZED-1.png'), label: "Dual Glazed 1" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/DUAL-GLAZED.png'), label: "Dual Glazed" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/HALF-GLAZED-2.png'), label: "Half Glazed 2" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/HALF-GLAZED-MAINE-2.png'), label: "Half Glazed Maine 2" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/HALF-GLAZED-MAINE.png'), label: "Half Glazed Maine" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/HALF-GLAZED.png'), label: "Half Glazed" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/RECTANGLE-2.png'), label: "Rectangle 2" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/SQAURE-DIAMOND.png'), label: "Square Diamond" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/SQUARE-2.png'), label: "Square 2" },
                  { image: require('../assets/doors/composite-doors/stable-doors/door-styles/STABLE-DOOR.png'), label: "Stable Door" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles.",
                images: [
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/BALMORAL-LEVER-HANDLE.png'), label: "Balmoral Lever Handle" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/BALMORAL-PAD-HANDLE.png'), label: "Balmoral Pad Handle" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/HERITAGE-LEVER-HANDLE.png'), label: "Heritage Lever Handle" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/SWEET-LEVER-HANDLE.png'), label: "Sweet Lever Handle" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/SWEET-LOCK-LOCK-HANDLE.png'), label: "Sweet Lock Lock Handle" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/handles/SWEET-SMART-LOCK-HANDLE-1.png'), label: "Sweet Smart Lock Handle 1" }
                ]
              },
              {
                title: "Knockers",
                content: "Add the perfect finishing touch with our stylish door knockers.",
                images: [
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" }
                ]
              },
              {
                title: "Letterplates",
                content: "Complete your door with a matching letterplate.",
                images: [
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/letterplates/Numail-Letterplate.webp'), label: "Numail Letterplate" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Extras",
                content: "Door knobs, numerals and other finishing touches.",
                images: [
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/extras/OCTAGONAL-DOOR-KNOB.png'), label: "Octagonal Door Knob" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/extras/ROUND-DOOR-KNOB.png'), label: "Round Door Knob" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/extras/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/stable-doors/hardware/extras/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Choose from our range of standard solid colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/white-smooth.png'), label: "White" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              },
              {
                title: "Rustic Colours",
                content: "Choose from our beautiful selection of rustic woodgrain colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/ANODISED.png'), label: "Anodised" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/BRONZE-1.png'), label: "Bronze" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/CHALK-WHITE.png'), label: "Chalk White" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/CLAY.png'), label: "Clay" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/CLOTTED-CREAM.png'), label: "Clotted Cream" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/CORSE-LAWN.png'), label: "Corse Lawn" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/COTSWOLD-BISUCIT.png'), label: "Cotswold Biscuit" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/COTSWOLD-GREEN.png'), label: "Cotswold Green" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/ELECTRIC-GREY.png'), label: "Electric Grey" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/ENGLISH-OAK.png'), label: "English Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/GINGER-OAK.png'), label: "Ginger Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/GOLDEN-OAK.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/GRAINED-WHITE.png'), label: "Grained White" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/GREYISH.png'), label: "Greyish" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/HONEY-OAK.png'), label: "Honey Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/NOIR.png'), label: "Noir" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/PAINSWICK.png'), label: "Painswick" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/PEPPER-OAK.png'), label: "Pepper Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/PYRITE.png'), label: "Pyrite" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/ROSEWOOD.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/SAGE.png'), label: "Sage" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/SILVERED-OAK.png'), label: "Silvered Oak" },
                  { image: require('../assets/doors/composite-doors/stable-doors/colours/rustic/VINTAGE-CREAM.png'), label: "Vintage Cream" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Explore beautiful glass patterns for your Stable door.",
                images: [
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/ASPEN.png'), label: "Aspen" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/AURORA.png'), label: "Aurora" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/BULLSEYE.png'), label: "Bullseye" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/CASCATA.png'), label: "Cascata" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/CHELSEA.png'), label: "Chelsea" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/CRYSTAL-FLOWERS.png'), label: "Crystal Flowers" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/ELEMENT.png'), label: "Element" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/GREENWICH.png'), label: "Greenwich" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/HORIZON-1.png'), label: "Horizon 1" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/KENSINGTON.png'), label: "Kensington" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/MASTERLINE.png'), label: "Masterline" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/MODENA.png'), label: "Modena" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/NEW-ORLEANS-BLACK.png'), label: "New Orleans Black" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/NEW-ORLEANS-ROSE-GOLD.png'), label: "New Orleans Rose Gold" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/NUMBERS.png'), label: "Numbers" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/PANACHE.png'), label: "Panache" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/REFLECTIONS.png'), label: "Reflections" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/RICHMONDZINC.png'), label: "Richmond Zinc" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/STRAND.png'), label: "Strand" },
                  { image: require('../assets/doors/composite-doors/stable-doors/glass/TAHOE-1.png'), label: "Tahoe 1" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "double-doors",
            title: "Double Doors",
            cardImage: require('../assets/doors/composite-doors/double-doors/category-card-image.png'),
            tagline: "Enhances your home’s entrance with functionality.",
            heroImage: require('../assets/doors/composite-doors/double-doors/main-image.png'),
            about: "Our Double Doors are designed to be the centrepiece of your home’s entrance, offering both functionality and style. Whether you’re looking to create a grand, spacious entryway or enhance the aesthetic appeal of your home with abundant natural light, our Double Doors provide the perfect solution. They seamlessly blend traditional craftsmanship with modern design, catering to a wide range of architectural styles and personal tastes.",
            stats: {
              rating: "4.9",
              reviews: "380",
              completed: "600+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Customisable Security",
                content: "At Bradley Scott Windows, you can choose from a wide array of hardware options, such as sturdy locking mechanisms, handles, and bolts, to personalize your door’s security and meet your preferences. Our composite door materials provide inherent strength, combined with these top-quality security features, ensuring a durable and resilient door solution.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Double Door Styles",
                content: "Explore our diverse range of double and french door designs.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/double-doors/door-styles/CONTEMPORARY-DOUBLE-DOORS.png'), label: "Contemporary Double Doors" },
                  { image: require('../assets/doors/composite-doors/double-doors/door-styles/DOOR-AND-A-HALF.png'), label: "Door and a Half" },
                  { image: require('../assets/doors/composite-doors/double-doors/door-styles/HERITAGE-DOUBLES.png'), label: "Heritage Doubles" },
                  { image: require('../assets/doors/composite-doors/double-doors/door-styles/STANDARD-FRENCH-DOORS.png'), label: "Standard French Doors" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles.",
                images: [
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/BALMORAL-LEVER-HANDLE.png'), label: "Balmoral Lever Handle" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/BALMORAL-PAD-HANDLE.png'), label: "Balmoral Pad Handle" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/HERITAGE-LEVER-HANDLE.png'), label: "Heritage Lever Handle" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/NUKI-HARDWARE-IMAGE.png'), label: "Nuki Hardware Image" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/SWEET-LEVER-HANDLE.png'), label: "Sweet Lever Handle" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/SWEET-LOCK-LOCK-HANDLE.png'), label: "Sweet Lock Lock Handle" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/SWEET-SMART-LOCK-HANDLE-1.png'), label: "Sweet Smart Lock Handle 1" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/standard-cylinder-pull.webp'), label: "Standard Cylinder Pull" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/handles/sweet-cylinder-pull.webp'), label: "Sweet Cylinder Pull" }
                ]
              },
              {
                title: "Knockers",
                content: "Add the perfect finishing touch with our stylish door knockers.",
                images: [
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/DOCTORS-KNOCKER.png'), label: "Doctors Knocker" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/Pony-Tail-Knocker.webp'), label: "Pony Tail Knocker" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/ring-knocker.webp'), label: "Ring Knocker" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/scroll-knocker.webp'), label: "Scroll Knocker" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/urn-knocker.webp'), label: "Urn Knocker" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/knockers/urn-knocker-with-spyhole.webp'), label: "Urn Knocker with Spyhole" }
                ]
              },
              {
                title: "Letterplates",
                content: "Complete your door with a matching letterplate.",
                images: [
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/letterplates/Numail-Letterplate.webp'), label: "Numail Letterplate" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/letterplates/architectual-letterplate.webp'), label: "Architectural Letterplate" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/letterplates/heritage-letterplate.webp'), label: "Heritage Letterplate" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/letterplates/sweet-square-letterplate.webp'), label: "Sweet Square Letterplate" }
                ]
              },
              {
                title: "Extras",
                content: "Door knobs, numerals and other finishing touches.",
                images: [
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/extras/OCTAGONAL-DOOR-KNOB.png'), label: "Octagonal Door Knob" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/extras/ROUND-DOOR-KNOB.png'), label: "Round Door Knob" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/extras/extras/standard-numerals.webp'), label: "Standard Numerals" },
                  { image: require('../assets/doors/composite-doors/double-doors/hardware/extras/extras/sweet-numerals.webp'), label: "Sweet Numerals" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Choose from our range of standard solid colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/white-smooth.png'), label: "White" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/black-smooth.png'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/cream-smooth.png'), label: "Cream" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/red-smooth.png'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/blue-smooth.png'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/green-smooth.png'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/stormy-seas-smooth.png'), label: "Stormy Seas" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/double-doors/colours/standard/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              }
            ],
            glass: [],
            galleryAlbumName: "Composite Doors"
          },
          {
            id: "inox-collection",
            title: "Inox Collection",
            cardImage: require('../assets/doors/composite-doors/inox/category-card-image.jpg'),
            tagline: "Discover the elegance of Inox composite doors.",
            heroImage: require('../assets/doors/composite-doors/inox/main-image.jpg'),
            about: "The Inox Collection combines the resilience of GRP composite materials with the sleek elegance of stainless steel finishes, designed to elevate any property with a touch of sophistication. These doors provide an impressive balance of strength and style, offering options that range from bold, statement pieces to refined, subtle designs that add lasting kerb appeal. Each door in the Inox range is crafted with finely textured 316-grade stainless steel frames and features stunning triple-glazed glass, delivering exceptional thermal efficiency and enduring aesthetics. With the Inox Collection, you gain both practicality and modern elegance that stand the test of time.",
            stats: {
              rating: "4.9",
              reviews: "380",
              completed: "600+"
            },
            priceLabel: "Price on Request",
            details: [
              {
                title: "Energy Efficient",
                content: "Featuring triple-glazed glass and an advanced, insulating composite core, these doors retain warmth in the winter and shield against excess heat in the summer. This thoughtful design minimizes energy usage, helping reduce heating and cooling costs while creating a consistently comfortable living space.",
                images: []
              },
              {
                title: "Fingerprint Entry",
                content: "In just a few seconds, you can open your door using your unique fingerprint, providing both speed and top-tier security with the reliable fingerprint sensor. For added convenience, the Nuki Keypad 2 is perfect for those who prefer not to use a code, such as young children, seniors, or anyone without a smartphone. This smart lock offers a modern, secure, and accessible solution for every household.",
                images: []
              }
            ],
            styles: [
              {
                title: "Inox Door Styles",
                content: "Explore our sophisticated sleek modern styles.",
                carouselImages: [
                  { image: require('../assets/doors/composite-doors/inox/door-styles/AMALFI.png'), label: "Amalfi" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/BARCELONA.png'), label: "Barcelona" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/LYON.png'), label: "Lyon" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/MONACO.png'), label: "Monaco" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/MUNCIH.png'), label: "Munich" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/NICE.png'), label: "Nice" },
                  { image: require('../assets/doors/composite-doors/inox/door-styles/SALZBURG.png'), label: "Salzburg" }
                ]
              }
            ],
            hardware: [
              {
                title: "Handles",
                content: "Choose from our selection of premium handles including traditional and modern.",
                images: [
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/BROOKLYN-LEVER-MATT-BLACK.png'), label: "Brooklyn Lever Matt Black" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/BROOKLYN-LEVER-SATIN-BRASS.png'), label: "Brooklyn Lever Satin Brass" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/BROOKLYN-LEVER-SATIN-STAINLESS-STEEL.png'), label: "Brooklyn Lever Satin Stainless Steel" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/ROUND-PULL-HANDLE.webp'), label: "Round Pull Handle" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/SWEET-HANDLE-BLACK.png'), label: "Sweet Handle Black" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/SWEET-HANDLE-GOLD.png'), label: "Sweet Handle Gold" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/SWEET-HANDLE-POLISHED-CHROME.png'), label: "Sweet Handle Polished Chrome" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/SWEET-HANDLE-SATIN-STAINLESS.png'), label: "Sweet Handle Satin Stainless" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/SWEET-HANDLE-WHITE.png'), label: "Sweet Handle White" },
                  { image: require('../assets/doors/composite-doors/inox/hardware/handles/square-pull-handle.png'), label: "Square Pull Handle" }
                ]
              }
            ],
            colours: [
              {
                title: "Standard Colours",
                content: "Classic and contemporary shades for any property.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/Black-1.jpg'), label: "Black" },
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/Blue-1.jpg'), label: "Blue" },
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/Green-1.jpg'), label: "Green" },
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/Red-1.jpg'), label: "Red" },
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/White-1.jpg'), label: "White" },
                  { image: require('../assets/doors/composite-doors/inox/colours/standard/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" }
                ]
              },
              {
                title: "Exclusive Colours",
                content: "A selection of beautiful painted textures and colours.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/GOLDEN-OAK-1.png'), label: "Golden Oak" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/IRISH-OAK.png'), label: "Irish Oak" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/ROSEWOOD-1.png'), label: "Rosewood" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/burgandy-smooth.png'), label: "Burgundy" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/coral-smooth.png'), label: "Coral" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/cotswold-smooth.png'), label: "Cotswold" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/cotton-candy-smooth.png'), label: "Cotton Candy" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/diablo-smooth.png'), label: "Diablo" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/florida-smooth.png'), label: "Florida" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/imperial-purple-smooth.png'), label: "Imperial Purple" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/lawn-grey-smooth.png'), label: "Lawn Grey" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/london-clay-smooth.png'), label: "London Clay" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/putty-smooth.png'), label: "Putty" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/sage-green-smooth.png'), label: "Sage Green" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/sunshine-smooth.png'), label: "Sunshine" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/very-berry-smooth.png'), label: "Very Berry" },
                  { image: require('../assets/doors/composite-doors/inox/colours/Exclusive Colours/victory-blue-smooth.png'), label: "Victory Blue" }
                ]
              },
              {
                title: "RAL Colours",
                content: "Subtle and modern architectural shades.",
                swatches: [
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/VINTAGE-CREAM-1.png'), label: "Vintage Cream" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/agate-grey-smooth.png'), label: "Agate Grey" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/anthracite-grey-smooth.png'), label: "Anthracite Grey" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/black-brown-smooth.png'), label: "Black Brown" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/chartwell-green-smooth.png'), label: "Chartwell Green" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/distant-blue-ral-5023-smooth.png'), label: "Distant Blue" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/duck-egg-smooth.png'), label: "Duck Egg" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/french-pebble-grey-ral-7032-smooth.png'), label: "French Pebble Grey" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/mouse-grey-ral-7005-smooth.png'), label: "Mouse Grey" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/slate-smooth.png'), label: "Slate" },
                  { image: require('../assets/doors/composite-doors/inox/colours/RAL Colours/traffic-grey-ral-7042-smooth.png'), label: "Traffic Grey" }
                ]
              }
            ],
            glass: [
              {
                title: "Glass Options",
                content: "Choose from our elegant glass range.",
                images: [
                  { image: require('../assets/doors/composite-doors/inox/glass/Clear-1.jpg'), label: "Clear" },
                  { image: require('../assets/doors/composite-doors/inox/glass/Kensington-1.jpg'), label: "Kensington" },
                  { image: require('../assets/doors/composite-doors/inox/glass/Pinpoint-1.jpg'), label: "Pinpoint" },
                  { image: require('../assets/doors/composite-doors/inox/glass/Rain-1.jpg'), label: "Rain" },
                  { image: require('../assets/doors/composite-doors/inox/glass/Satin-1.jpg'), label: "Satin" }
                ]
              }
            ],
            galleryAlbumName: "Composite Doors"
          }
        ]
      },
      {
        id: "bi-fold-doors",
        title: "Bi-Fold Doors",
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
            overviewImage: require('../assets/doors/bi-fold-doors/styles/threshold-types/Level-3.png'),
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
      }
    ]
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
        cardImage: require('../assets/skyrooms/main-image.png'),
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
