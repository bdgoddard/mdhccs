var path = require("path");
var webpack = require("webpack");
var packageData = require("./package.json");

module.exports = {
    entry: {
        // Point "entry" to scripts you want to be CLI-eligible.
        //mdhccs: "./src/index.ts",
        //mdhccs_gash: "./src/gash-hop.ts",
	//mdhccs_test: "./src/test.ts",
        mdsccs: "./src_softcore/index.ts",
        mdhccs: "./src/index.ts",
        mdhccs_toot: "./src/toot.ts",
	mdhccs_shopping: "./src/shopping.ts",
	mdhccs_generateturns: "./src/generateturns.ts",
	mdhccs_prepgear: "./src/prepgear.ts",
        mdhccs_getingredients: "./src/getingredients.ts",
        mdhccs_buff: "./src/buff.ts",
        mdhccs_mushroom: "./src/mushroom.ts",
        mdhccs_lovtunnel: "./src/lovtunnel.ts",
        mdhccs_profchain: "./src/profchain.ts",
        mdhccs_backupchain: "./src/backupchain.ts",
        mdhccs_nep: "./src/nep.ts",
        mdhccs_godlobster: "./src/godlobster.ts",
        mdhccs_pilsners: "./src/pilsners.ts",
        mdhccs_asdon: "./src/driveobservantly.ts",
        mdhccs_item: "./src/item.ts",
        mdhccs_firstfights: "./src/firstfights.ts",
        mdhccs_synth: "./src/synth.ts",
        mdhccs_weapon: "./src/weapon.ts",
        mdhccs_testrem: "./src/testrem.ts",
    },
    mode: "development",
    devtool: false,
    output: {
        // Change the final string here to the name you want your script to use in mafia.
        path: path.resolve(__dirname, "KoLmafia", "scripts", packageData.name),
        filename: "[name].js",
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                // exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [],
    externals: {
        // Add any ASH scripts you would like to use here.
        kolmafia: "commonjs kolmafia",
        "canadv.ash": "commonjs canadv.ash",
    },
};
