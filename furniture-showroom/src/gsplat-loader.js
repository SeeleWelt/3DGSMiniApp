import { Asset, GSplatData } from "playcanvas";

let assetId = 0;

function loadGsplat(assets, assetSource) {
  const contents =
    assetSource.contents &&
    (assetSource.contents instanceof Response ? assetSource.contents : new Response(assetSource.contents));

  const file = {
    url: contents ? `local-asset-${assetId++}` : assetSource.url || assetSource.filename,
    filename: assetSource.filename,
    contents
  };

  const data = {
    decompress: true,
    reorder: !(assetSource.animationFrame || false)
  };

  return new Promise((resolve, reject) => {
    const asset = new Asset(assetSource.filename || assetSource.url, "gsplat", file, data, {
      mapUrl: assetSource.mapUrl
    });

    asset.on("load:data", (loadedData) => {
      if (
        loadedData instanceof GSplatData &&
        loadedData.getProp("scale_0") &&
        loadedData.getProp("scale_1") &&
        !loadedData.getProp("scale_2")
      ) {
        const scale2 = new Float32Array(loadedData.numSplats).fill(Math.log(1e-6));
        loadedData.addProp("scale_2", scale2);

        const props = loadedData.getElement("vertex").properties;
        props.splice(props.findIndex((prop) => prop.name === "scale_1") + 1, 0, props.splice(props.length - 1, 1)[0]);
      }
    });

    asset.on("load", () => {
      const required = [
        "x",
        "y",
        "z",
        "scale_0",
        "scale_1",
        "scale_2",
        "rot_0",
        "rot_1",
        "rot_2",
        "rot_3",
        "f_dc_0",
        "f_dc_1",
        "f_dc_2",
        "opacity"
      ];
      const splatData = asset.resource.gsplatData;
      const missing = required.filter((name) => !splatData.getProp(name));

      if (missing.length) {
        reject(new Error(`Missing 3DGS properties: ${missing.join(", ")}`));
        return;
      }

      resolve(asset);
    });

    asset.on("error", (error) => {
      reject(error instanceof Error ? error : new Error(String(error || "Failed to load 3DGS asset.")));
    });

    assets.add(asset);
    assets.load(asset);
  });
}

export { loadGsplat };
