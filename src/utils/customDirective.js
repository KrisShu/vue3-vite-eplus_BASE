/**
 * 自定义指令
 * @param {*} app 
 */
export default function directive(app){
    app.directive('permiss', {
        mounted(el, binding) {
            console.log("el",el)
            console.log("binding",binding)
            // if (!permiss.key.includes(String(binding.value))) {
            //     el['hidden'] = true;
            // }
        },
    });
}
