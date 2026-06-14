const assetUrl = (path) => path.replace(/^(\.\.\/)*public\//, "./");

const showroomFurnitureItems = [
  {
    id: "lounge-armchair",
    category: "Armchair",
    countLabel: "12 pieces",
    title: "Lounge Armchair",
    era: "1960s",
    style: "Scandinavian Modern",
    origin: "Copenhagen, Denmark",
    image: assetUrl("../../public/images/lounge-armchair.png"),
    description:
      "A sculptural teak lounge chair with textured boucle upholstery, presented for close material inspection and remote selling.",
    dimensions: {
      Height: "81 cm",
      Width: "72 cm",
      Depth: "78 cm",
      "Seat height": "42 cm"
    },
    materials: [
      { name: "Solid teak wood", role: "Frame", color: "#9b5f29" },
      { name: "Wool blend boucle", role: "Upholstery", color: "#c9bca6" },
      { name: "Natural wax finish", role: "Surface", color: "#e6ded0" }
    ],
    condition: {
      grade: "Excellent",
      detail:
        "Frame inspected, upholstery refreshed, and wood sealed with natural hardwax oil."
    },
    captureNote:
      "Presented from a low showroom angle so buyers can inspect the arms, seat profile, wood grain, and fabric texture.",
    insights: [
      {
        title: "Web showroom",
        text: "Embed the interactive scene on a brand website, collection page, or sales landing page."
      },
      {
        title: "Material inspection",
        text: "Let remote buyers inspect fabric, wood tone, edges, and restoration details before visiting."
      },
      {
        title: "Sales handoff",
        text: "Use the same interactive view during video calls, showroom follow-ups, and quote conversations."
      }
    ],
    model: {
      tilt: "-3deg",
      scale: 1,
      shadow: "rgba(80, 45, 18, 0.22)"
    },
    viewerModel: {
      url: assetUrl("../../public/models/lounge-armchair.ply"),
      type: "gsplat-ply",
      rotateX: -90,
      modelYaw: -8,
      cameraYaw: 28,
      cameraPitch: 7,
      cameraPadding: 1.68,
      targetY: 0.03
    }
  },
  {
    id: "serra-side-table",
    category: "Table",
    countLabel: "24 pieces",
    title: "Serra Side Table",
    era: "1970s",
    style: "Travertine & Oak",
    origin: "France",
    image: assetUrl("../../public/images/serra-side-table.png"),
    description:
      "A round side table pairing a quiet stone top with warm oak volume, ideal for showing material contrast in 3D.",
    dimensions: {
      Height: "48 cm",
      Diameter: "55 cm",
      Weight: "28 kg",
      "Top thickness": "7 cm"
    },
    materials: [
      { name: "Travertine", role: "Top", color: "#d8cbb9" },
      { name: "Solid oak", role: "Base", color: "#a5642c" },
      { name: "Soft matte seal", role: "Finish", color: "#ede6d8" }
    ],
    condition: {
      grade: "Very Good",
      detail:
        "Light signs of age consistent with stone use and careful restoration."
    },
    captureNote:
      "Presented to emphasize stone edge thickness, cylindrical volume, and the soft shadow under the base.",
    insights: [
      {
        title: "Scale clarity",
        text: "Use dimensions and orbit view together so buyers understand height and tabletop proportion."
      },
      {
        title: "Texture realism",
        text: "Stone and wood surfaces benefit from close, interactive viewing on the web."
      },
      {
        title: "Room preview",
        text: "A compact object works well for future placement previews in living room scenes."
      }
    ],
    model: {
      tilt: "1deg",
      scale: 1.04,
      shadow: "rgba(88, 54, 26, 0.2)"
    },
    viewerModel: {
      url: assetUrl("../../public/models/serra-side-table.ply"),
      type: "gsplat-ply",
      rotateX: -90,
      modelYaw: 4,
      cameraYaw: 34,
      cameraPitch: 8,
      cameraPadding: 1.76,
      targetY: 0.04
    }
  },
  {
    id: "atelier-low-sofa",
    category: "Sofa",
    countLabel: "18 pieces",
    title: "Atelier Low Sofa",
    era: "1980s",
    style: "Textured Cotton",
    origin: "Milan, Italy",
    image: assetUrl("../../public/images/atelier-low-sofa.png"),
    description:
      "A low, generous sofa with a wood plinth and relaxed textile volume, presented as a calm centerpiece for residential projects.",
    dimensions: {
      Height: "72 cm",
      Width: "218 cm",
      Depth: "92 cm",
      "Seat height": "39 cm"
    },
    materials: [
      { name: "Textured cotton", role: "Upholstery", color: "#cfc3ae" },
      { name: "Walnut rail", role: "Base", color: "#8b5528" },
      { name: "Feather blend", role: "Cushions", color: "#e3d8c8" }
    ],
    condition: {
      grade: "Restored",
      detail:
        "Cushions rebuilt, fabric steamed, and base polished for showroom presentation."
    },
    captureNote:
      "Presented from a wide viewing angle to show cushion depth, back angle, and the wood rail under the sofa.",
    insights: [
      {
        title: "Remote sizing",
        text: "Large furniture benefits from interactive scale cues and clear dimension cards."
      },
      {
        title: "Client comparison",
        text: "Designers can compare shape and fabric mood before requesting a physical viewing."
      },
      {
        title: "Collection context",
        text: "Pair sofas with chairs and tables to build a full digital showroom story."
      }
    ],
    model: {
      tilt: "-1deg",
      scale: 1.02,
      shadow: "rgba(78, 48, 28, 0.18)"
    },
    viewerModel: {
      url: assetUrl("../../public/models/atelier-low-sofa.ply"),
      type: "gsplat-ply",
      rotateX: -90,
      modelYaw: -6,
      cameraYaw: 24,
      cameraPitch: 6,
      cameraPadding: 1.58,
      targetY: 0.02
    }
  },
  {
    id: "archive-cabinet",
    category: "Cabinet",
    countLabel: "16 pieces",
    title: "Archive Cabinet",
    era: "1970s",
    style: "Oak & Brass",
    origin: "London, United Kingdom",
    image: assetUrl("../../public/images/archive-cabinet.png"),
    description:
      "A compact oak cabinet with brass details, useful for showing flat panels, hardware, and reflective accents online.",
    dimensions: {
      Height: "88 cm",
      Width: "92 cm",
      Depth: "42 cm",
      "Door count": "2"
    },
    materials: [
      { name: "Oak veneer", role: "Cabinet body", color: "#995d2a" },
      { name: "Brass pull", role: "Hardware", color: "#c9a15a" },
      { name: "Clear oil", role: "Finish", color: "#eadfce" }
    ],
    condition: {
      grade: "Excellent",
      detail:
        "Doors aligned, brass cleaned, and surface refreshed while preserving patina."
    },
    captureNote:
      "Presented to show door alignment, hardware highlights, and subtle grain movement across flat panels.",
    insights: [
      {
        title: "Detail review",
        text: "Hardware and front panels can be inspected before a buyer requests additional photos."
      },
      {
        title: "Catalog upgrade",
        text: "Turn a conventional product card into a deeper interactive product study."
      },
      {
        title: "Restoration proof",
        text: "Show restoration quality with notes, close views, and side-by-side proof when available."
      }
    ],
    model: {
      tilt: "0deg",
      scale: 1.08,
      shadow: "rgba(69, 41, 19, 0.2)"
    },
    viewerModel: {
      url: assetUrl("../../public/models/aigui-model.ply"),
      type: "gsplat-ply",
      rotateX: -90,
      modelYaw: -8,
      cameraYaw: 30,
      cameraPitch: 8,
      cameraPadding: 1.72,
      targetY: 0.02
    }
  },
  {
    id: "ceramic-table-lamp",
    category: "Lamp",
    countLabel: "15 pieces",
    title: "Ceramic Table Lamp",
    era: "1990s",
    style: "Linen & Ceramic",
    origin: "Kyoto, Japan",
    image: assetUrl("../../public/images/ceramic-table-lamp.png"),
    description:
      "A warm ceramic table lamp with a linen shade, included to show how smaller decorative objects can live in the same showroom.",
    dimensions: {
      Height: "58 cm",
      Width: "34 cm",
      Depth: "34 cm",
      "Cable length": "160 cm"
    },
    materials: [
      { name: "Linen shade", role: "Shade", color: "#d8c8ad" },
      { name: "Ceramic base", role: "Base", color: "#bca989" },
      { name: "Aged brass", role: "Stem", color: "#b68a45" }
    ],
    condition: {
      grade: "Very Good",
      detail:
        "Shade cleaned, wiring checked, and ceramic surface preserved with light age marks."
    },
    captureNote:
      "Presented to show silhouette readability, material softness, and small-object detail in the viewer.",
    insights: [
      {
        title: "Small object mode",
        text: "Decorative objects need a tighter default camera and clear scale references."
      },
      {
        title: "Lighting story",
        text: "Use notes and room previews to show how a lamp changes atmosphere."
      },
      {
        title: "Accessory library",
        text: "Smaller pieces help build a richer furniture collection and browsing rhythm."
      }
    ],
    model: {
      tilt: "2deg",
      scale: 0.98,
      shadow: "rgba(78, 55, 34, 0.17)"
    },
    viewerModel: {
      url: assetUrl("../../public/models/taideng-model.ply"),
      type: "gsplat-ply",
      rotateX: -90,
      modelYaw: 6,
      cameraYaw: 32,
      cameraPitch: 7,
      cameraPadding: 1.62,
      targetY: 0.04
    }
  }
];

const defaultFurnitureId = "atelier-low-sofa";

export const showroomFurniture = [
  ...showroomFurnitureItems.filter((item) => item.id === defaultFurnitureId),
  ...showroomFurnitureItems.filter((item) => item.id !== defaultFurnitureId)
];

window.showroomFurniture = showroomFurniture;
