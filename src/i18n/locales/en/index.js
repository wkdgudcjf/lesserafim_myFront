import main from "./main.json";
import dialog from "./dialog.json";
import notice from "./notice.json";
import warnings from "./warnings.json";
import faq from "./faq.json";

const pack = {
  "translation": {
    ...main,
    ...dialog,
    ...faq,
    ...warnings,
    ...notice,
  },
};
export default pack;
