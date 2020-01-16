const wabt = require("wabt")();

const WatInstantiate = function (wat_src, callback, importObject = null, exportObject = null, ...exportNames ) {
    const wasmModule = wabt.parseWat("", wat_src);
    wasmModule.validate();
    
    const binary_result = wasmModule.toBinary({}).buffer;
    
    (async () => {
        let obj;
        if( importObject != null ) {
            obj = await WebAssembly.instantiate( new Uint8Array(binary_result), importObject );
        }
        else {
            obj = await WebAssembly.instantiate( new Uint8Array(binary_result) );
        }

        if( exportObject != null ) {
            for( i = 0; i < exportNames.length; i++ ) {
                let exportName = exportNames[i];
                exportObject[exportName] = obj.instance.exports[exportName];
            }
        }

        callback();

    })();
}

module.exports = WatInstantiate;