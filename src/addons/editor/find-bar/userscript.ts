import defineScript from "../../../helpers/define-script";
export default defineScript(async function ({ addon }) {
  console.log("hi scratch!");
  console.log(addon.id);
  
});
