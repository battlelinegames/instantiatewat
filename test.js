const wat_instantiate = require("./index.js");
const exportObject = {};
const importObject = {
  js: {
    global_a: 99,
    global_b: 100
  }
};

const wat = `
(module
  (global (import "js" "global_a") i32)
  (global (import "js" "global_b") i32)

  (func (export "AddGlobals") (result i32)
    get_global 0
    get_global 1
    i32.add
  )

  (func (export "IntAdd") (param $var1 i32) (param $var2 i32) (result i32)
    get_local $var1
    get_local $var2
    i32.add
  )
  (func (export "IntSub") (param $var1 i32) (param $var2 i32) (result i32)
    get_local $var1
    get_local $var2
    i32.sub
  )
  (func (export "IntMul") (param $var1 i32) (param $var2 i32) (result i32)
    get_local $var1
    get_local $var2
    i32.mul
  )
)
`;

const callback = function() {
    let add_num = exportObject.IntAdd( 100, 10 );
    let sub_num = exportObject.IntSub( 100, 10 );
    let mul_num = exportObject.IntMul( 100, 10 );    
    let global_result = exportObject.AddGlobals();

    console.log(`add_num: ${add_num}`);
    console.log(`sub_num: ${sub_num}`);
    console.log(`mul_num: ${mul_num}`);
    console.log(`global_result: ${global_result}`);
}

wat_instantiate(wat, callback, importObject, exportObject, "IntAdd", "IntSub", "IntMul", "AddGlobals");
