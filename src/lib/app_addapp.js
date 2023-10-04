import icons from "./database-icons.js";
import CONST from "./CONST.js"

export default  {
    name: "add",
    id: 0,
    svg: icons.plus,
    backgroundColor: "rgb(255, 0, 0)",
    script: `
      // this is a system app, not editable. This one will execute (ADD_APP)
    `,
    system: CONST.ADD_APP
}